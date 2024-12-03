import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, JobStatus } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobsRepository.create(createJobDto);

    // If customer ID is provided, find and attach the customer
    if (createJobDto.customerId) {
      const customer = await this.usersRepository.findOne({ 
        where: { id: createJobDto.customerId } 
      });
      if (customer) {
        job.customer = customer;
      }
    }

    // If handyman ID is provided, find and attach the handyman
    if (createJobDto.handymanId) {
      const handyman = await this.usersRepository.findOne({ 
        where: { id: createJobDto.handymanId } 
      });
      if (handyman) {
        job.handyman = handyman;
      }
    }

    return this.jobsRepository.save(job);
  }

  async findAll(): Promise<Job[]> {
    return this.jobsRepository.find({
      relations: ['customer', 'handyman']
    });
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobsRepository.findOne({ 
      where: { id },
      relations: ['customer', 'handyman']
    });
    
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    
    return job;
  }

  async update(id: string, updateJobDto: Partial<CreateJobDto>): Promise<Job> {
    const job = await this.findOne(id);
    
    // Update job fields
    Object.assign(job, updateJobDto);

    // If customer ID is provided, find and attach the customer
    if (updateJobDto.customerId) {
      const customer = await this.usersRepository.findOne({ 
        where: { id: updateJobDto.customerId } 
      });
      if (customer) {
        job.customer = customer;
      }
    }

    // If handyman ID is provided, find and attach the handyman
    if (updateJobDto.handymanId) {
      const handyman = await this.usersRepository.findOne({ 
        where: { id: updateJobDto.handymanId } 
      });
      if (handyman) {
        job.handyman = handyman;
      }
    }

    return this.jobsRepository.save(job);
  }

  async remove(id: string): Promise<void> {
    const job = await this.findOne(id);
    await this.jobsRepository.remove(job);
  }
}
