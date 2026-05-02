import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum TransactionSource {
  PAYMENT = 'payment',
  FEE = 'fee',
  TRANSFER = 'transfer',
  CASHOUT = 'cashout',
  REFUND = 'refund',
  REVENUE_SPLIT = 'revenue_split',
}

export enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  REVERSED = 'reversed',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'wallet_id' })
  walletId: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({
    type: 'enum',
    enum: TransactionSource,
  })
  source: TransactionSource;

  @Column({ name: 'amount_units', type: 'decimal', precision: 18, scale: 4 })
  amountUnits: number;

  @Column({ name: 'amount_currency', type: 'decimal', precision: 18, scale: 2, nullable: true })
  amountCurrency: number;

  @Column({ unique: true })
  reference: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ name: 'association_id', nullable: true })
  associationId: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ name: 'reversed_by_id', nullable: true })
  reversedById: string;

  @ManyToOne(() => Wallet)
  @JoinColumn({ name: 'wallet_id' })
  wallet: Wallet;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
