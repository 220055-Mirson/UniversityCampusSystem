import { Router } from 'express';
import { loginSchema, refreshSchema } from '@smart-campus/validation';
import { authenticate } from '../../../middleware/auth.js';
import { success } from '../../../middleware/errorHandler.js';
import * as authService from '../application/authService.js';

export const authRouter = Router();

authRouter.post('/login', async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);
    const result = await authService.login(body.email, body.password, {
      correlationId: req.correlationId,
      ip: req.ip,
      ua: req.header('user-agent') ?? undefined,
    });
    success(res, result);
  } catch (err) {
    next(err);
  }
});

authRouter.post('/refresh', async (req, res, next) => {
  try {
    const body = refreshSchema.parse(req.body);
    const result = await authService.refresh(body.refreshToken, { correlationId: req.correlationId });
    success(res, result);
  } catch (err) {
    next(err);
  }
});

authRouter.post('/logout', authenticate, async (req, res, next) => {
  try {
    const refreshToken = typeof req.body?.refreshToken === 'string' ? req.body.refreshToken : null;
    const result = await authService.logout(refreshToken, req.user?.id, { correlationId: req.correlationId });
    success(res, result);
  } catch (err) {
    next(err);
  }
});
