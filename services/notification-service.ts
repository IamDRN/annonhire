import { prisma } from "@/lib/db/prisma";

export async function createNotification(userId: string, title: string, message: string, type = "general") {
  return prisma.notification.create({
    data: { userId, title, message, type }
  });
}

export async function markNotificationAsRead(userId: string, notificationId: string) {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,
      userId
    },
    data: {
      isRead: true
    }
  });
}
