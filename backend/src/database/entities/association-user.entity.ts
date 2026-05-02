import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Association } from './association.entity';
import { Role } from './role.entity';
import { Region } from './region.entity';
import { Branch } from './branch.entity';
import { Member } from './member.entity';

export enum AssociationUserStatus {
  INACTIVE = 'inactive',
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

export enum MemberType {
  MASTER = 'master',
  VENDOR = 'vendor',
  SUB = 'sub',
  NATIONAL_ADMIN = 'national_admin',
  NATIONAL_MANAGER = 'national_manager',
  NATIONAL_CONSULTANT = 'national_consultant',
  REGIONAL_MANAGER = 'regional_manager',
  BRANCH_MANAGER = 'branch_manager',
}

@Entity('association_users')
export class AssociationUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'association_id' })
  associationId: string;

  @Column({ name: 'role_id', nullable: true })
  roleId: string;

  @Column({
    name: 'member_type',
    type: 'enum',
    enum: MemberType,
    nullable: true,
  })
  memberType: MemberType;

  @Column({
    type: 'enum',
    enum: AssociationUserStatus,
    default: AssociationUserStatus.INACTIVE,
  })
  status: AssociationUserStatus;

  @Column({ name: 'region_id', nullable: true })
  regionId: string;

  @Column({ name: 'branch_id', nullable: true })
  branchId: string;

  @Column({ name: 'parent_member_id', nullable: true })
  parentMemberId: string;

  @Column({ name: 'invited_by', nullable: true })
  invitedBy: string;

  @ManyToOne(() => User, (u) => u.associationUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Association, (a) => a.associationUsers)
  @JoinColumn({ name: 'association_id' })
  association: Association;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Region, { nullable: true })
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @ManyToOne(() => Branch, { nullable: true })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @OneToOne(() => Member, (m) => m.associationUser)
  member: Member;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
