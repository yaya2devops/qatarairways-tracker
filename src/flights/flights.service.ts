import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackedFlight } from './entities/tracked-flight.entity';
import { FlightAlert } from './entities/flight-alert.entity';
import { CreateTrackedFlightDto } from './dto/create-tracked-flight.dto';
import { QatarAirwaysClient, FlightOffer } from './qatar-airways.client';
import { NotifierService } from '../notifier/notifier.service';

export type ChangeType =  | 'BECAME_AVAILABLE'
  | 'BECAME_UNAVAILABLE'
  | 'PRICE_CHANGED'
  | 'SEATS_CHANGED';

interface FareSnapshot {
  flightNumber: string;
  departureDateTime: string;
  fareFamilyCode: string;
  cabinType: string;
  total: number;
  availableSeats: number;
}

export interface ChangeDetail {
  type: ChangeType;
  description: string;
}

@Injectable()
export class FlightsService {
  private readonly logger = new Logger(FlightsService.name);

  constructor(
    @InjectRepository(TrackedFlight)
    private readonly flightRepo: Repository<TrackedFlight>,
    @InjectRepository(FlightAlert)
    private readonly alertRepo: Repository<FlightAlert>,
    private readonly notifier: NotifierService,
    private readonly client: QatarAirwaysClient,
  ) {}

  // ── CRUD ──────────────────────────────────────────────────────────────────

  async create(dto: CreateTrackedFlightDto): Promise<TrackedFlight> {
    const flight = this.flightRepo.create({
      origin: dto.origin.toUpperCase(),
      destination: dto.destination.toUpperCase(),
      departureDate: dto.departureDate,
      cabinClass: (dto.cabinClass ?? 'ECONOMY').toUpperCase(),
      adults: dto.adults ?? 1,
    });
    return this.flightRepo.save(flight);
  }

  async createRange(
    origin: string,
    destination: string,
    from: string,
    to: string,
    cabinClass?: string,
    adults?: number,
  ): Promise<TrackedFlight[]> {
    const results: TrackedFlight[] = [];
    const current = new Date(from);
    const end = new Date(to);

    while (current <= end) {
      const dateStr = current.toISOString().slice(0, 10);
      const existing = await this.flightRepo.findOne({
        where: {
          origin: origin.toUpperCase(),
          destination: destination.toUpperCase(),
          departureDate: dateStr,
        },
      });
      if (!existing) {
        const flight = await this.create({ origin, destination, departureDate: dateStr, cabinClass, adults });
        results.push(flight);
      }
      current.setDate(current.getDate() + 1);
    }
    return results;
  }

  findAll(): Promise<TrackedFlight[]> {
    return this.flightRepo.find({ order: { departureDate: 'ASC' } });
  }

  findActive(): Promise<TrackedFlight[]> {
    return this.flightRepo.find({
      where: { isActive: true },
      order: { departureDate: 'ASC' },
    });
  }

  async remove(id: number): Promise<void> {
    const flight = await this.flightRepo.findOne({ where: { id } });
    if (!flight) throw new NotFoundException(`Tracked flight #${id} not found`);
    await this.flightRepo.remove(flight);
  }

  async setActive(id: number, isActive: boolean): Promise<TrackedFlight> {
    const flight = await this.flightRepo.findOne({ where: { id } });
    if (!flight) throw new NotFoundException(`Tracked flight #${id} not found`);
    flight.isActive = isActive;
    return this.flightRepo.save(flight);
  }

  // ── Polling ───────────────────────────────────────────────────────────────

  async checkAll(): Promise<void> {
    const flights = await this.findActive();
    if (!flights.length) {
      this.logger.log('No active tracked flights — nothing to check.');
      return;
    }
    this.logger.log(`Checking ${flights.length} tracked flight(s)…`);
    for (const flight of flights) {
      await this.checkOne(flight);
    }
  }

  private async checkOne(flight: TrackedFlight): Promise<void> {
    const label = `${flight.origin}→${flight.destination} on ${flight.departureDate} (${flight.cabinClass})`;

    const result = await this.client.searchFlights(
      flight.origin,
      flight.destination,
      flight.departureDate,
      flight.cabinClass,
      flight.adults,
    );

    flight.lastCheckedAt = new Date();

    if (result.status === 'ERROR') {
      this.logger.warn(`Error for ${label}: ${result.error}`);
      await this.flightRepo.save(flight);
      return;
    }

    const previousStatus = flight.lastStatus;
    const previousSnapshot: FareSnapshot[] = flight.lastSnapshot
      ? JSON.parse(flight.lastSnapshot)
      : [];

    // ── Detect what changed ────────────────────────────────────────────────
    const changes: ChangeDetail[] = [];

    if (result.status === 'UNAVAILABLE') {
      if (previousStatus === 'AVAILABLE') {
        changes.push({
          type: 'BECAME_UNAVAILABLE',
          description: 'Flight is no longer available (sold out or removed).',
        });
      }
      flight.lastStatus = 'UNAVAILABLE';
      flight.lastSnapshot = '[]';
      await this.flightRepo.save(flight);

      if (changes.length) {
        this.logger.log(`Change detected for ${label}: BECAME_UNAVAILABLE`);
        await this.sendAlert(flight, [], changes);
      } else {
        this.logger.debug(`Still unavailable: ${label}`);
      }
      return;
    }

    // Status is AVAILABLE
    const currentOffers = result.flightOffers!;
    const currentSnapshot = this.buildSnapshot(currentOffers);

    if (previousStatus !== 'AVAILABLE') {
      changes.push({
        type: 'BECAME_AVAILABLE',
        description: 'Flights are now available for this date!',
      });
    } else {
      // Both were available — diff the snapshots
      const priceChanges = this.detectPriceChanges(previousSnapshot, currentSnapshot);
      const seatChanges = this.detectSeatChanges(previousSnapshot, currentSnapshot);
      changes.push(...priceChanges, ...seatChanges);
    }

    flight.lastStatus = 'AVAILABLE';
    flight.lastSnapshot = JSON.stringify(currentSnapshot);
    await this.flightRepo.save(flight);

    if (changes.length) {
      this.logger.log(
        `Change(s) detected for ${label}: ${changes.map((c) => c.type).join(', ')}`,
      );
      await this.sendAlert(flight, currentOffers, changes);
    } else {
      this.logger.debug(`No changes for ${label}`);
    }
  }

  // ── Change detection helpers ───────────────────────────────────────────

  private buildSnapshot(offers: FlightOffer[]): FareSnapshot[] {
    return offers.flatMap((offer) =>
      offer.fareOffers.map((fare) => ({
        flightNumber: offer.segments[0].flightNumber,
        departureDateTime: offer.segments[0].departure.dateTime,
        fareFamilyCode: fare.fareFamilyCode,
        cabinType: fare.cabinType,
        total: fare.price.total,
        availableSeats: fare.availableSeats,
      })),
    );
  }

  private detectPriceChanges(
    prev: FareSnapshot[],
    curr: FareSnapshot[],
  ): ChangeDetail[] {
    const changes: ChangeDetail[] = [];
    for (const c of curr) {
      const p = prev.find(
        (s) => s.flightNumber === c.flightNumber && s.fareFamilyCode === c.fareFamilyCode,
      );
      if (!p) continue;
      if (p.total !== c.total) {
        const dir = c.total < p.total ? '↓ decreased' : '↑ increased';
        changes.push({
          type: 'PRICE_CHANGED',
          description: `${c.flightNumber} ${c.fareFamilyCode} (${c.cabinType}): price ${dir} from ${p.total} → ${c.total} QAR`,
        });
      }
    }
    return changes;
  }

  private detectSeatChanges(
    prev: FareSnapshot[],
    curr: FareSnapshot[],
  ): ChangeDetail[] {
    const changes: ChangeDetail[] = [];
    for (const c of curr) {
      const p = prev.find(
        (s) => s.flightNumber === c.flightNumber && s.fareFamilyCode === c.fareFamilyCode,
      );
      if (!p) continue;
      if (p.availableSeats !== c.availableSeats) {
        const dir = c.availableSeats < p.availableSeats ? 'decreased' : 'increased';
        changes.push({
          type: 'SEATS_CHANGED',
          description: `${c.flightNumber} ${c.fareFamilyCode} (${c.cabinType}): seats ${dir} from ${p.availableSeats} → ${c.availableSeats}`,
        });
      }
    }
    return changes;
  }

  // ── Alert dispatch ─────────────────────────────────────────────────────

  private async sendAlert(
    flight: TrackedFlight,
    offers: FlightOffer[],
    changes: ChangeDetail[],
  ): Promise<void> {
    // One alert record per change type
    const primaryChange = changes[0];

    const alert = this.alertRepo.create({
      trackedFlight: flight,
      offersSnapshot: JSON.stringify(offers),
      changeType: primaryChange.type,
      emailSent: false,
    });

    try {
      await this.notifier.sendFlightAlert(flight, offers, changes);
      alert.emailSent = true;
    } catch (err: any) {
      this.logger.error(
        `Failed to send email for ${flight.origin}→${flight.destination} on ${flight.departureDate}: ${err.message}`,
      );
    }

    await this.alertRepo.save(alert);
  }
}
