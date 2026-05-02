import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Association } from './association.entity';
import { Region } from './region.entity';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'association_id' })
  associationId: string;

  @Column({ name: 'region_id' })
  regionId: string;

  @Column()
  name: string;

  @Column({ name: 'manager_id', nullable: true })
  managerId: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @ManyToOne(() => Association, (a) => a.branches)
  @JoinColumn({ name: 'association_id' })
  association: Association;

  @ManyToOne(() => Region, (r) => r.branches)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
