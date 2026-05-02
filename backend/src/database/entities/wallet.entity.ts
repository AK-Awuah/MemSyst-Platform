import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Association } from './association.entity';

export enum WalletOwnerType {
  PLATFORM = 'platform',
  ASSOCIATION = 'association',
  REGION = 'region',
  BRANCH = 'branch',
  MEMBER = 'member',
}

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'owner_type',
    type: 'enum',
    enum: WalletOwnerType,
  })
  ownerType: WalletOwnerType;

  @Column({ name: 'owner_id' })
  ownerId: string;

  // null for platform wallet
  @Column({ name: 'association_id', nullable: true })
  associationId: string;

  @Column({ name: 'balance_units', type: 'decimal', precision: 18, scale: 4, default: 0 })
  balanceUnits: number;

  @ManyToOne(() => Association, (a) => a.wallets, { nullable: true })
  @JoinColumn({ name: 'association_id' })
  association: Association;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
