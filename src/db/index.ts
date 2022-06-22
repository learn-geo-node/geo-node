require('dotenv').config()
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { postgresConfig } from './config';

export const AppDataSource = new DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: false,
  logging: false,
  entities: ['src/entities/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
