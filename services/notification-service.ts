import { prisma } from "@/lib/db/prisma";

export async function createNotification(userId: string, title: string, description: string) {
  return prisma.notification.create({
    data: { userId, title, description }
  });
}
