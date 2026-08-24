import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../lib/errors.js';
import { logger } from '../lib/logger.js';

export function success<T>(res: Response, data: T, status = 200, extraMeta: Record<string, unknown> = {}) {
  return res.status(status).json({
    data,
    meta: {
      correlationId: res.getHeader('x-correlation-id') || (res.req as Request).correlationId,
      ...extraMeta,
    },
  });
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const correlationId = req.correlationId ?? 'unknown';

  if (err instanceof ZodError) {
    return res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: 'Dados inválidos',
      details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      correlationId,
    });
  }

  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error(err.message, { code: err.code, correlationId });
    }
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      details: err.details,
      correlationId,
    });
  }

  logger.error('Unhandled error', {
    correlationId,
    error: err instanceof Error ? err.message : 'unknown',
  });

  return res.status(500).json({
    code: 'INTERNAL_ERROR',
    message: 'Erro interno do servidor',
    details: [],
    correlationId,
  });
}
