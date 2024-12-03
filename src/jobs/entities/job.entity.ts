import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum JobStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  finalPrice: number;

  @Column({ 
    type: 'enum', 
    enum: JobStatus, 
    default: JobStatus.PENDING 
  })
  status: JobStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'timestamp', nullable: true })
  scheduledDate: Date;

  @ManyToOne(() => User, user => user.jobsCreated, { nullable: true })
  customer: User;

  @ManyToOne(() => User, user => user.jobsAssigned, { nullable: true })
  handyman: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
