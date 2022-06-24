import dotenv from 'dotenv';
import config from 'config';

dotenv.config();

export const configuration = {
  port: config.get<number>('port')
} as const;

export type AppConfiguration = typeof configuration;