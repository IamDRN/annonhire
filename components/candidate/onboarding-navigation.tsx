import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingNavigation({
  canGoBack,
  backLabel = "Back",
  nextLabel = "Continue",
  onBack,
  onNext,
  isSubmitting = false
}: {
  canGoBack?: boolean;
  backLabel?: string;
  nextLabel?: string;
  onBack?: () => void;
  onNext?: () => void;
  isSubmitting?: boolean;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
      <Button variant="ghost" type="button" disabled={!canGoBack || isSubmitting} onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {backLabel}
      </Button>
      <Button type="button" disabled={isSubmitting} onClick={onNext}>
        {nextLabel}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
