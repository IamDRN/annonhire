import { CheckCircle2 } from "lucide-react";

export function OnboardingStepHeader({
  step,
  totalSteps,
  title,
  description
}: {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-900 dark:text-slate-300">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Step {step} of {totalSteps}
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}
