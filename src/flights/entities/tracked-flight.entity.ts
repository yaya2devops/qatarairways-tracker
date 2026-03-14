import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { FlightAlert } from './flight-alert.entity';

@Entity()
export class TrackedFlight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string; // e.g. "DOH"

  @Column()
  destination: string; // e.g. "ISB"

  @Column()
  departureDate: string; // e.g. "2026-03-29"

  @Column({ default: 'ECONOMY' })
  cabinClass: string; // ECONOMY | BUSINESS | FIRST

  @Column({ default: 1 })
  adults: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastCheckedAt: Date;

  @Column({ nullable: true })
  lastStatus: string; // "AVAILABLE" | "UNAVAILABLE" | "ERROR"

  /** JSON snapshot of last known offers — used to detect changes */
  @Column({ type: 'text', nullable: true })
  lastSnapshot: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FlightAlert, (alert) => alert.trackedFlight)
  alerts: FlightAlert[];
}
