import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('otp_records')
export class OtpRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'otp_hash' })
  otpHash: string;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  @Column({ default: 0 })
  attempts: number;

  @Column({ default: false })
  verified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
