import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Association } from './association.entity';
import { Branch } from './branch.entity';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'association_id' })
  associationId: string;

  @Column()
  name: string;

  @Column({ name: 'manager_id', nullable: true })
  managerId: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @ManyToOne(() => Association, (a) => a.regions)
  @JoinColumn({ name: 'association_id' })
  association: Association;

  @OneToMany(() => Branch, (b) => b.region)
  branches: Branch[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
