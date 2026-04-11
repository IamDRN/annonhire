import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function NotificationBell({
  notifications
}: {
  notifications: { id: string; title: string; description: string; readAt: Date | null }[];
}) {
  const unread = notifications.filter((item) => !item.readAt).length;

  return (
    <Card id="notifications">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>In-app alerts for requests, verification, and profile activity.</CardDescription>
        </div>
        <Badge variant={unread ? "info" : "default"}>{unread} unread</Badge>
      </CardHeader>
      <CardContent>
        {notifications.length ? (
          notifications.map((notification) => (
            <div key={notification.id} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="font-medium">{notification.title}</p>
              <p className="mt-1 text-sm text-muted">{notification.description}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">No notifications yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
