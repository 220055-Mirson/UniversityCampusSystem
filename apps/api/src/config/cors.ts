import type { Env } from './env.js';

/** Origens explícitas + *.onrender.com em produção (URLs Render mudam com sufixo goc1, i6hq, etc.). */
export function createCorsOrigin(env: Env) {
  const allowed = env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean);

  return (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    if (allowed.includes(origin)) {
      callback(null, true);
      return;
    }
    if (env.NODE_ENV === 'production' && /^https:\/\/[\w-]+\.onrender\.com$/i.test(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  };
}
