import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class QrSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  cookie: string;

  @Column()
  sessionId: string;

  @Column()
  deviceId: string;

  @Column()
  nbxApiKey: string;

  /** We assume cookies last ~2 hours; Playwright refreshes before this. */
  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
