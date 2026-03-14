import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackedFlight } from './entities/tracked-flight.entity';
import { FlightAlert } from './entities/flight-alert.entity';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { QatarAirwaysClient } from './qatar-airways.client';
import { NotifierModule } from '../notifier/notifier.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackedFlight, FlightAlert]),
    NotifierModule,
    SessionModule,
  ],
  providers: [FlightsService, QatarAirwaysClient],
  controllers: [FlightsController],
  exports: [FlightsService],
})
export class FlightsModule {}
