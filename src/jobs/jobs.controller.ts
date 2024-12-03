import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards 
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  async findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Job> {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateJobDto: Partial<CreateJobDto>
  ): Promise<Job> {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.jobsService.remove(id);
  }
}
