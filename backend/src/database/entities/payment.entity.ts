import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'association_id' })
  associationId: string;

  @Column({ name: 'wallet_id' })
  walletId: string;

  @Column({ name: 'amount_paid', type: 'decimal', precision: 18, scale: 2 })
  amountPaid: number;

  @Column({ name: 'units_to_credit', type: 'decimal', precision: 18, scale: 4 })
  unitsToCredit: number;

  @Column({ unique: true })
  reference: string;

  @Column({ default: 'paystack' })
  provider: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
