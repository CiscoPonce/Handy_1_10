import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { HealthController } from './main';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
  exports: [UsersModule]
})
export class AppModule {}
