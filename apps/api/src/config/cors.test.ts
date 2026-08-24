import { describe, expect, it, vi } from 'vitest';
import { createCorsOrigin } from './cors.js';
import { loadEnv } from './env.js';

const baseEnv = {
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/smart_campus?schema=public',
  JWT_ACCESS_SECRET: 'test-access-secret-change-me-min-32-chars!!',
  JWT_REFRESH_SECRET: 'test-refresh-secret-change-me-min-32-chars!',
  NODE_ENV: 'production' as const,
};

describe('createCorsOrigin', () => {
  it('aceita origem configurada', () => {
    const env = loadEnv({ ...baseEnv, CORS_ORIGIN: 'https://app.example.com' });
    const cb = vi.fn();
    createCorsOrigin(env)('https://app.example.com', cb);
    expect(cb).toHaveBeenCalledWith(null, true);
  });

  it('aceita qualquer *.onrender.com em produção', () => {
    const env = loadEnv({ ...baseEnv, CORS_ORIGIN: 'https://other.example.com' });
    const cb = vi.fn();
    createCorsOrigin(env)('https://smart-campus-web-goc1.onrender.com', cb);
    expect(cb).toHaveBeenCalledWith(null, true);
  });
});
