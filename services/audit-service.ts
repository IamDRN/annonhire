import { prisma } from "@/lib/db/prisma";

export async function logAuditEvent(params: {
  actorId?: string;
  action: string;
  entity: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}) {
  return prisma.auditLog.create({
    data: {
      actorId: params.actorId,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      metadata: params.metadata
    }
  });
}
