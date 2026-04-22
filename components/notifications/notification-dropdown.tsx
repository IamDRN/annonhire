"use client";

import { NotificationItem } from "@/components/notifications/notification-item";

type NotificationData = {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

export function NotificationDropdown({
  notifications,
  onOpenNotification
}: {
  notifications: NotificationData[];
  onOpenNotification: (notificationId: string) => void;
}) {
  return (
    <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-[360px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(84,115,138,0.18)] dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Updates about requests, approvals, and account activity.</p>
      </div>
      <div className="max-h-[420px] space-y-3 overflow-y-auto p-4">
        {notifications.length ? (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onOpen={onOpenNotification} />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">No notifications</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">You’re all caught up for now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
