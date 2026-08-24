import { Router } from 'express';
import { createIncidentSchema, updateIncidentStatusSchema } from '@smart-campus/validation';
import { authenticate, authorize } from '../../../middleware/auth.js';
import { success } from '../../../middleware/errorHandler.js';
import * as incidentService from '../application/incidentService.js';

export const incidentsRouter = Router();

incidentsRouter.get('/incidents', authenticate, async (_req, res, next) => {
  try {
    success(res, await incidentService.listIncidents());
  } catch (err) {
    next(err);
  }
});

incidentsRouter.post('/incidents', authenticate, async (req, res, next) => {
  try {
    const body = createIncidentSchema.parse(req.body);
    const incident = await incidentService.createIncident(body, req.user!.id, req.correlationId);
    success(res, incident, 201);
  } catch (err) {
    next(err);
  }
});

incidentsRouter.patch(
  '/incidents/:id/status',
  authenticate,
  authorize('TECHNICIAN', 'COORDINATOR', 'ADMIN'),
  async (req, res, next) => {
    try {
      const body = updateIncidentStatusSchema.parse(req.body);
      const incident = await incidentService.updateIncidentStatus(
        req.params.id,
        body,
        { id: req.user!.id, role: req.user!.role },
        req.correlationId,
      );
      success(res, incident);
    } catch (err) {
      next(err);
    }
  },
);
