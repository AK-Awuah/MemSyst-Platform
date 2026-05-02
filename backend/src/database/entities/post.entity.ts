import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum PostStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  EXPIRED = 'expired',
  DELETED = 'deleted',
}

export enum PostTier {
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'association_id' })
  associationId: string;

  @Column({ name: 'member_id' })
  memberId: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column({ name: 'deal_type', nullable: true })
  dealType: string;

  @Column({
    type: 'enum',
    enum: PostTier,
    default: PostTier.STANDARD,
  })
  tier: PostTier;

  @Column()
  duration: string;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate: Date;

  @Column({ name: 'expiry_date', type: 'timestamptz' })
  expiryDate: Date;

  @Column({ name: 'auto_renew', default: false })
  autoRenew: boolean;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.ACTIVE,
  })
  status: PostStatus;

  @Column({ name: 'media_urls', type: 'jsonb', nullable: true })
  mediaUrls: string[];

  @Column({ name: 'fee_charged_units', type: 'decimal', precision: 18, scale: 4, nullable: true })
  feeChargedUnits: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
