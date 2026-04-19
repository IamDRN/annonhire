import type React from "react";
import { ShieldCheck } from "lucide-react";

export function AuthHeader({
  badge,
  title,
  description,
  children
}: {
  badge: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-800 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-200">
        <ShieldCheck className="h-4 w-4" />
        {badge}
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
