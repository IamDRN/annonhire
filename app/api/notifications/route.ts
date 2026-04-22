import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { getNotificationsForUser } from "@/services/dashboard-service";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [notifications, unreadCount] = await Promise.all([
    getNotificationsForUser(session.user.id),
    prisma.notification.count({
      where: {
        userId: session.user.id,
        isRead: false
      }
    })
  ]);

  return NextResponse.json({ results: notifications, unreadCount });
}
