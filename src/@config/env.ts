import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test', 'local']).default('local'),
  LOG_LEVEL: z.enum(['debug', 'info', 'verbose']).default('debug'),
  PORT: z.coerce.number().default(3333),
  CORS_ORIGIN: z.string().default('*'),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().optional(),
  API_PREFIX: z.string().default('/api'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(_env.error.format(), null, 2));
  process.exit(1);
}

export const env = _env.data;
export type Env = z.infer<typeof envSchema>;
