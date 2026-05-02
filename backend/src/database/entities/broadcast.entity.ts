import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BroadcastStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('broadcasts')
export class Broadcast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'association_id' })
  associationId: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'jsonb' })
  channels: string[];

  @Column({ name: 'target_scope', type: 'jsonb' })
  targetScope: Record<string, any>;

  @Column({ name: 'total_recipients', default: 0 })
  totalRecipients: number;

  @Column({ name: 'total_sent', default: 0 })
  totalSent: number;

  @Column({ name: 'total_failed', default: 0 })
  totalFailed: number;

  @Column({ name: 'cost_units', type: 'decimal', precision: 18, scale: 4, default: 0 })
  costUnits: number;

  @Column({ name: 'file_url', nullable: true })
  fileUrl: string;

  @Column({
    type: 'enum',
    enum: BroadcastStatus,
    default: BroadcastStatus.PENDING,
  })
  status: BroadcastStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
