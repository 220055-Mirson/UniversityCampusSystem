import { Router } from 'express';
import { authenticate, authorize } from '../../../middleware/auth.js';
import { success } from '../../../middleware/errorHandler.js';
import { listAuditEvents } from '../application/auditService.js';

export const auditRouter = Router();

auditRouter.get('/audit-events', authenticate, authorize('ADMIN', 'COORDINATOR'), async (req, res, next) => {
  try {
    const limit = Number(req.query.limit ?? 50);
    success(res, await listAuditEvents(limit));
  } catch (err) {
    next(err);
  }
});
