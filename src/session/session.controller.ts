import { Controller, Post, Get } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  /** Show the current session metadata (no cookie value for security) */
  @Get()
  async current() {
    const session = await this.sessionService.getSession();
    return {
      id: session.id,
      sessionId: session.sessionId,
      deviceId: session.deviceId,
      expiresAt: session.expiresAt,
      createdAt: session.createdAt,
    };
  }

  /** Manually trigger a cookie refresh via Playwright */
  @Post('refresh')
  async refresh() {
    const session = await this.sessionService.forceRefresh();
    return {
      message: 'Session refreshed successfully.',
      expiresAt: session.expiresAt,
    };
  }
}
