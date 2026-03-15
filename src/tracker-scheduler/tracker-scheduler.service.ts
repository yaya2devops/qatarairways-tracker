import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FlightsService } from '../flights/flights.service';

@Injectable()
export class TrackerSchedulerService {
  private readonly logger = new Logger(TrackerSchedulerService.name);
  private isRunning = false;

  constructor(private readonly flightsService: FlightsService) {}

  /**
   * Runs every 15 minutes by default.
   * Override by changing the cron expression below or adding a POLL_INTERVAL
   * env-based dynamic cron (upgrade to @Interval if you prefer milliseconds).
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron(): Promise<void> {
    if (this.isRunning) {
      this.logger.warn('Previous check is still running — skipping this tick.');
      return;
    }

    this.isRunning = true;
    this.logger.log('Scheduler tick — starting flight check…');

    try {
      await this.flightsService.checkAll();
    } catch (err: any) {
      this.logger.error(`Unhandled error in scheduler: ${err.message}`);
    } finally {
      this.isRunning = false;
    }
  }
}
