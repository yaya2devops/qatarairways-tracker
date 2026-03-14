import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateTrackedFlightDto } from './dto/create-tracked-flight.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  /** List all tracked flights */
  @Get()
  findAll() {
    return this.flightsService.findAll();
  }

  /**
   * Add a new flight to watch.
   * Body: { origin, destination, departureDate, cabinClass?, adults? }
   * Example: { "origin":"DOH","destination":"ISB","departureDate":"2026-03-22","cabinClass":"ECONOMY" }
   */
  @Post()
  create(@Body() dto: CreateTrackedFlightDto) {
    return this.flightsService.create(dto);
  }

  /** Remove a tracked flight */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.flightsService.remove(id);
  }

  /** Pause/resume tracking */
  @Patch(':id/active')
  setActive(
    @Param('id', ParseIntPipe) id: number,
    @Body('isActive') isActive: boolean,
  ) {
    return this.flightsService.setActive(id, isActive);
  }

  /**
   * Track every day in a date range.
   * Body: { origin, destination, from, to, cabinClass?, adults? }
   * Example: { "origin":"DOH","destination":"ISB","from":"2026-03-15","to":"2026-04-04","cabinClass":"ECONOMY" }
   */
  @Post('range')
  async createRange(
    @Body()
    body: {
      origin: string;
      destination: string;
      from: string;
      to: string;
      cabinClass?: string;
      adults?: number;
    },
  ) {
    const results = await this.flightsService.createRange(
      body.origin,
      body.destination,
      body.from,
      body.to,
      body.cabinClass,
      body.adults,
    );
    return { created: results.length, flights: results };
  }

  /** Trigger a manual check right now */
  @Post('check-now')
  async checkNow() {
    await this.flightsService.checkAll();
    return { message: 'Manual check triggered — see server logs.' };
  }
}
