import { Prisma } from '@prisma/client';
import { prisma } from '../../../lib/prisma.js';

export async function audit(input: {
  action: string;
  resource: string;
  resourceId?: string | null;
  actorId?: string | null;
  correlationId: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}) {
  return prisma.auditEvent.create({
    data: {
      action: input.action,
      resource: input.resource,
      resourceId: input.resourceId ?? undefined,
      actorId: input.actorId ?? undefined,
      correlationId: input.correlationId,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    },
  });
}

export async function listAuditEvents(limit = 50) {
  return prisma.auditEvent.findMany({
    orderBy: { createdAt: 'desc' },
    take: Math.min(limit, 200),
    include: {
      actor: { select: { id: true, email: true, fullName: true } },
    },
  });
}
