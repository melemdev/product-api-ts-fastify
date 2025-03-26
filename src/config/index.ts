import 'dotenv/config'
import { env } from "./env";

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  cors: {
    origin: env.CORS_ORIGIN,
  },
  swagger: {
    title: "API Products",
    version: "1.0.0",
    routePrefix: "/docs",
  },
  api: {
    prefix: env.API_PREFIX || '/api',
  },
  database: {
    url: env.DATABASE_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  log_level: env.LOG_LEVEL
} as const; 