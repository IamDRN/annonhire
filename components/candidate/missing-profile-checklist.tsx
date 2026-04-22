import Link from "next/link";
import { ArrowRight, CircleDashed, Sparkles } from "lucide-react";
import type { MissingProfileItem } from "@/lib/profile-completeness";

export function MissingProfileChecklist({
  items,
  compact = false
}: {
  items: MissingProfileItem[];
  compact?: boolean;
}) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200">
        Your profile looks strong. You’re ready to be discovered by employers.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50"
        >
          <div className="flex min-w-0 items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-300">
              {compact ? <CircleDashed className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          </div>
          <Link
            href={item.href}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-800 dark:hover:bg-sky-950/40 dark:hover:text-sky-200"
          >
            {item.actionLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
