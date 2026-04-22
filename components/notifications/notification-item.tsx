"use client";

import { Bell, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

type NotificationData = {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

const typeIcons: Record<string, typeof Bell> = {
  contact_request: Bell,
  request_approved: CheckCircle2,
  request_rejected: Bell,
  request_update: Bell,
  welcome: Sparkles,
  verification_update: ShieldCheck,
  connection_ready: CheckCircle2,
  general: Bell
};

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const diff = date.getTime() - Date.now();
  const minutes = Math.round(diff / (1000 * 60));
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(minutes) < 60) return formatter.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return formatter.format(hours, "hour");
  const days = Math.round(hours / 24);
  return formatter.format(days, "day");
}

export function NotificationItem({
  notification,
  onOpen
}: {
  notification: NotificationData;
  onOpen: (notificationId: string) => void;
}) {
  const Icon = typeIcons[notification.type] ?? Bell;

  return (
    <button
      type="button"
      onClick={() => onOpen(notification.id)}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        notification.isRead
          ? "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:bg-slate-900"
          : "border-sky-100 bg-sky-50/80 hover:border-sky-200 hover:bg-sky-50 dark:border-sky-900/40 dark:bg-sky-950/20 dark:hover:border-sky-900/60 dark:hover:bg-sky-950/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm dark:bg-slate-900">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{notification.title}</p>
            {!notification.isRead ? <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-500" /> : null}
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{notification.message}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            {formatRelativeTime(notification.createdAt)}
          </p>
        </div>
      </div>
    </button>
  );
}
