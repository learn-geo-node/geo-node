export const configuration = {
  port: process.env.PORT,
} as const;

export type AppConfiguration = typeof configuration;
