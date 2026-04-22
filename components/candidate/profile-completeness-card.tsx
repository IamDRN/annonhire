import { CheckCircle2, Sparkles } from "lucide-react";
import type { ProfileCompletenessResult } from "@/lib/profile-completeness";
import { Card } from "@/components/ui/card";
import { CompletionProgressBar } from "@/components/candidate/completion-progress-bar";
import { MissingProfileChecklist } from "@/components/candidate/missing-profile-checklist";

function getCompletenessMessage(score: number) {
  if (score >= 90) return "Your profile is in excellent shape for employer discovery.";
  if (score >= 70) return "Complete the final details to improve visibility and response quality.";
  if (score >= 40) return "Complete your profile to get discovered faster.";
  return "A few quick updates will make your profile much easier for employers to evaluate.";
}

export function ProfileCompletenessCard({
  result
}: {
  result: ProfileCompletenessResult;
}) {
  return (
    <Card className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:bg-sky-950/40 dark:text-sky-200">
            <Sparkles className="h-3.5 w-3.5" />
            Search readiness
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Your profile is {result.score}% complete</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{getCompletenessMessage(result.score)}</p>
        </div>
        {result.score === 100 ? (
          <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            Fully complete
          </div>
        ) : null}
      </div>

      <CompletionProgressBar score={result.score} />

      <div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Recommended next actions</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Focus on the highest-impact sections first to become more searchable.</p>
      </div>
      <MissingProfileChecklist items={result.suggestedNextActions} />
    </Card>
  );
}
