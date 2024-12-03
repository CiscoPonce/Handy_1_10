import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    HealthModule,
    JobsModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [UsersModule]
})
export class AppModule {}
