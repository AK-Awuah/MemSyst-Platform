import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('revenue_splits')
export class RevenueSplit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'association_id', unique: true })
  associationId: string;

  @Column({ name: 'platform_pct', type: 'decimal', precision: 5, scale: 2, default: 15 })
  platformPct: number;

  @Column({ name: 'association_pct', type: 'decimal', precision: 5, scale: 2, default: 20 })
  associationPct: number;

  @Column({ name: 'region_pct', type: 'decimal', precision: 5, scale: 2, default: 30 })
  regionPct: number;

  @Column({ name: 'branch_pct', type: 'decimal', precision: 5, scale: 2, default: 35 })
  branchPct: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
