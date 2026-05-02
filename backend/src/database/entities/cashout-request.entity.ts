import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CashoutStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
}

export enum PayoutMethod {
  MOBILE_MONEY = 'mobile_money',
  EFT = 'eft',
}

@Entity('cashout_requests')
export class CashoutRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'wallet_id' })
  walletId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'association_id' })
  associationId: string;

  @Column({ name: 'amount_units', type: 'decimal', precision: 18, scale: 4 })
  amountUnits: number;

  @Column({
    name: 'payout_method',
    type: 'enum',
    enum: PayoutMethod,
  })
  payoutMethod: PayoutMethod;

  @Column({ name: 'bank_details', type: 'jsonb', nullable: true })
  bankDetails: Record<string, any>;

  @Column({
    type: 'enum',
    enum: CashoutStatus,
    default: CashoutStatus.PENDING,
  })
  status: CashoutStatus;

  @Column({ name: 'otp_verified', default: false })
  otpVerified: boolean;

  @Column({ name: 'reviewed_by', nullable: true })
  reviewedBy: string;

  @Column({ name: 'rejection_reason', nullable: true })
  rejectionReason: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
