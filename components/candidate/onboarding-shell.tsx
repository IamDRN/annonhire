import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function OnboardingShell({
  title,
  description,
  badge,
  progress,
  children,
  aside
}: {
  title: string;
  description: string;
  badge: string;
  progress: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <main className="container-width py-8 md:py-10">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="overflow-hidden p-0">
            <div className="border-b border-slate-200 bg-gradient-to-br from-white via-sky-50 to-cyan-50 px-6 py-6 dark:border-slate-800 dark:from-slate-950 dark:via-sky-950/20 dark:to-cyan-950/10">
              <div className="inline-flex rounded-full border border-sky-100 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:border-sky-900/40 dark:bg-slate-950/70 dark:text-sky-200">
                {badge}
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
              <div className="mt-6">{progress}</div>
            </div>
            <div className="p-6">{children}</div>
          </Card>
        </div>
        {aside ? <div className="space-y-6">{aside}</div> : null}
      </div>
    </main>
  );
}
