import { redis, RedisConfig } from './app-config';

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe('redis config', () => {
  it('returns host and port from environment variables', () => {
    process.env.REDIS_HOST = '127.1.1.1';
    process.env.REDIS_PORT = '6380';

    const config = redis() as RedisConfig;

    expect(config.host).toBe('127.1.1.1');
    expect(config.port).toBe(6380);
  });

  it('returns undefined fields when variables are missing', () => {
    delete process.env.REDIS_HOST;
    delete process.env.REDIS_PORT;

    const config = redis() as RedisConfig;

    expect(config.host).toBe('127.0.0.1');
    expect(config.port).toBe(6379);
  });
});
