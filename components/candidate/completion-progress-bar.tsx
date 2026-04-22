import { cn } from "@/lib/utils";

export function CompletionProgressBar({
  score,
  className
}: {
  score: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        <span>Profile completeness</span>
        <span>{score}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-primary to-cyan-400 transition-all duration-500"
          style={{ width: `${Math.max(6, Math.min(score, 100))}%` }}
        />
      </div>
    </div>
  );
}
