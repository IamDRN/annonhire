import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { markNotificationAsRead } from "@/services/notification-service";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { notificationId?: string };
  if (!body.notificationId) {
    return NextResponse.json({ error: "Notification id is required" }, { status: 400 });
  }

  await markNotificationAsRead(session.user.id, body.notificationId);

  return NextResponse.json({ ok: true });
}
