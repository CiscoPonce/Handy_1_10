import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgresql://handyman_owner:h8BJOiTxtP6d@ep-patient-fog-a2kjx4by.eu-central-1.aws.neon.tech/handyman?sslmode=require',
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  synchronize: true, // be careful with this in production
  logging: true,
  autoLoadEntities: true,
};
