import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TrackedFlight } from './tracked-flight.entity';

@Entity()
export class FlightAlert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TrackedFlight, (flight) => flight.alerts, {
    onDelete: 'CASCADE',
  })
  trackedFlight: TrackedFlight;

  // Snapshot of the available fare offers at notification time
  @Column({ type: 'text' })
  offersSnapshot: string; // JSON string

  /** What triggered this alert */
  @Column({ default: 'AVAILABLE' })
  changeType: string; // BECAME_AVAILABLE | BECAME_UNAVAILABLE | PRICE_CHANGED | SEATS_CHANGED

  @Column({ default: false })
  emailSent: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
