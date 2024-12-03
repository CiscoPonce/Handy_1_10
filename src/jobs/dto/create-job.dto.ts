import { IsString, IsOptional, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';
import { JobStatus } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  estimatedPrice?: number;

  @IsOptional()
  @IsNumber()
  finalPrice?: number;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDate()
  scheduledDate?: Date;

  @IsOptional()
  @IsUUID()
  customerId?: string;

  @IsOptional()
  @IsUUID()
  handymanId?: string;
}
