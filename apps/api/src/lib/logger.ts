type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const levelWeight: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function currentLevel(): LogLevel {
  return (process.env.LOG_LEVEL as LogLevel) || 'info';
}

function write(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  if (levelWeight[level] < levelWeight[currentLevel()]) return;
  const payload = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...sanitize(meta),
  };
  const line = JSON.stringify(payload);
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

function sanitize(meta?: Record<string, unknown>) {
  if (!meta) return {};
  const clone = { ...meta };
  for (const key of Object.keys(clone)) {
    const lower = key.toLowerCase();
    if (lower.includes('password') || lower.includes('token') || lower.includes('secret') || lower.includes('authorization')) {
      clone[key] = '[REDACTED]';
    }
  }
  return clone;
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => write('debug', message, meta),
  info: (message: string, meta?: Record<string, unknown>) => write('info', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => write('warn', message, meta),
  error: (message: string, meta?: Record<string, unknown>) => write('error', message, meta),
};
