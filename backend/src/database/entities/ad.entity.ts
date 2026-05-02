import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum AdStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  EXPIRED = 'expired',
  DELETED = 'deleted',
}

@Entity('ads')
export class Ad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'association_id' })
  associationId: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ nullable: true })
  title: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'external_url' })
  externalUrl: string;

  @Column()
  duration: string;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate: Date;

  @Column({ name: 'expiry_date', type: 'timestamptz' })
  expiryDate: Date;

  @Column({
    type: 'enum',
    enum: AdStatus,
    default: AdStatus.ACTIVE,
  })
  status: AdStatus;

  @Column({ name: 'fee_charged_units', type: 'decimal', precision: 18, scale: 4, nullable: true })
  feeChargedUnits: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
