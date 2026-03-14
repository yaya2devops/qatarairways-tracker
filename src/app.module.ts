import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsModule } from './flights/flights.module';
import { NotifierModule } from './notifier/notifier.module';
import { TrackerSchedulerModule } from './tracker-scheduler/tracker-scheduler.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'tracker.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SessionModule,
    FlightsModule,
    NotifierModule,
    TrackerSchedulerModule,
  ],
})
export class AppModule {}
