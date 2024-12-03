import { DataSource } from 'typeorm';
import { typeOrmConfig } from './src/config/database.config';

export default new DataSource({
  ...typeOrmConfig,
  migrations: ['src/migrations/**/*.ts'],
  entities: ['src/**/*.entity.ts'],
});
