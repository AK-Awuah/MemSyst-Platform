import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { AssociationUser } from './association-user.entity';
import { Region } from './region.entity';
import { Branch } from './branch.entity';
import { Wallet } from './wallet.entity';

export enum AssociationStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export interface BrandingConfig {
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  theme?: 'light' | 'dark';
  customCss?: string;
}

@Entity('associations')
export class Association {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  prefix: string;

  @Column({ unique: true, nullable: true })
  domain: string;

  @Column({ name: 'domain_verified', default: false })
  domainVerified: boolean;

  @Column({ name: 'domain_verification_token', nullable: true })
  domainVerificationToken: string;

  @Column({ name: 'branding_config', type: 'jsonb', nullable: true })
  brandingConfig: BrandingConfig;

  @Column({
    type: 'enum',
    enum: AssociationStatus,
    default: AssociationStatus.PENDING,
  })
  status: AssociationStatus;

  @Column({ type: 'jsonb', nullable: true })
  settings: Record<string, any>;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @OneToMany(() => AssociationUser, (au) => au.association)
  associationUsers: AssociationUser[];

  @OneToMany(() => Region, (r) => r.association)
  regions: Region[];

  @OneToMany(() => Branch, (b) => b.association)
  branches: Branch[];

  @OneToMany(() => Wallet, (w) => w.association)
  wallets: Wallet[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
