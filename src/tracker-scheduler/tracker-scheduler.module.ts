import { Module } from '@nestjs/common';
import { TrackerSchedulerService } from './tracker-scheduler.service';
import { FlightsModule } from '../flights/flights.module';

@Module({
  imports: [FlightsModule],
  providers: [TrackerSchedulerService],
})
export class TrackerSchedulerModule {}
