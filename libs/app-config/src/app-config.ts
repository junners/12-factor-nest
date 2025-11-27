import { registerAs } from '@nestjs/config';

export interface RedisConfig {
  host: string;
  port: number;
}

export const redis = registerAs<RedisConfig>('redis', () => {
  return {
    host: process.env.REDIS_HOST ?? '127.0.0.1',
    port: Number.parseInt((process.env.REDIS_PORT as string) ?? 6379),
  };
});
