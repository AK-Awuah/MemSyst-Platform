import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AssociationUser } from './association-user.entity';

export enum MemberTypeEnum {
  MASTER = 'master',
  VENDOR = 'vendor',
  SUB = 'sub',
}

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'association_user_id', unique: true })
  associationUserId: string;

  @Column({ name: 'association_id' })
  associationId: string;

  @Column({ name: 'account_id', unique: true })
  accountId: string;

  @Column({
    name: 'member_type',
    type: 'enum',
    enum: MemberTypeEnum,
  })
  memberType: MemberTypeEnum;

  @Column({ name: 'parent_member_id', nullable: true })
  parentMemberId: string;

  @Column({ name: 'qr_code_url', nullable: true })
  qrCodeUrl: string;

  @Column({ name: 'expiry_date', type: 'timestamptz', nullable: true })
  expiryDate: Date;

  @Column({ name: 'renewed_at', type: 'timestamptz', nullable: true })
  renewedAt: Date;

  @Column({ name: 'profile_data', type: 'jsonb', nullable: true })
  profileData: Record<string, any>;

  @OneToOne(() => AssociationUser, (au) => au.member)
  @JoinColumn({ name: 'association_user_id' })
  associationUser: AssociationUser;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
