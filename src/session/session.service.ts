import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrSession } from './entities/qr-session.entity';
import { CookieRefresherService } from './cookie-refresher.service';

// How long (ms) before expiry we proactively refresh (15 min buffer)
const REFRESH_BUFFER_MS = 15 * 60 * 1000;
// How long we consider a session valid after capture
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

// A sensible default route to use when we have no tracked flights yet
const DEFAULT_ORIGIN = 'DOH';
const DEFAULT_DEST = 'ISB';

@Injectable()
export class SessionService implements OnModuleInit {
  private readonly logger = new Logger(SessionService.name);
  private refreshing = false;

  constructor(
    @InjectRepository(QrSession)
    private readonly sessionRepo: Repository<QrSession>,
    private readonly refresher: CookieRefresherService,
  ) {}

  async onModuleInit() {
    // Eagerly grab a session on startup if we don't have a valid one
    const session = await this.getValid();
    if (!session) {
      this.logger.log('No valid session on startup — fetching one now…');
      await this.forceRefresh();
    }
  }

  /**
   * Returns the current valid session, refreshing if needed.
   * Pass `forceNew = true` (called on 403) to always refresh.
   */
  async getSession(forceNew = false): Promise<QrSession> {
    if (!forceNew) {
      const valid = await this.getValid();
      if (valid) return valid;
    }
    return this.forceRefresh();
  }

  /** Trigger a browser-based refresh and persist the result. */
  async forceRefresh(
    origin = DEFAULT_ORIGIN,
    destination = DEFAULT_DEST,
  ): Promise<QrSession> {
    if (this.refreshing) {
      this.logger.warn('Refresh already in progress — waiting for it to finish…');
      // Poll until the other refresh completes
      return new Promise((resolve) => {
        const interval = setInterval(async () => {
          if (!this.refreshing) {
            clearInterval(interval);
            const session = await this.getValid();
            resolve(session!);
          }
        }, 2000);
      });
    }

    this.refreshing = true;
    try {
      // Use a date ~2 weeks from now so QR is likely to have results
      const date = this.futureDate(14);
      const captured = await this.refresher.refresh(origin, destination, date);

      const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
      const session = this.sessionRepo.create({ ...captured, expiresAt });
      const saved = await this.sessionRepo.save(session);

      this.logger.log(`New session saved (expires ${expiresAt.toISOString()})`);
      return saved;
    } finally {
      this.refreshing = false;
    }
  }

  private async getValid(): Promise<QrSession | null> {
    const session = await this.sessionRepo.findOne({
      where: {},
      order: { createdAt: 'DESC' },
    });
    if (!session) return null;

    const bufferDeadline = new Date(Date.now() + REFRESH_BUFFER_MS);
    return session.expiresAt > bufferDeadline ? session : null;
  }

  private futureDate(daysFromNow: number): string {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  }
}
