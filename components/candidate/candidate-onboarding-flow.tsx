"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, FileText, Lock, Sparkles } from "lucide-react";
import { completeCandidateOnboarding, saveOnboardingStep } from "@/actions/candidate-profile";
import { CompletionProgressBar } from "@/components/candidate/completion-progress-bar";
import { MissingProfileChecklist } from "@/components/candidate/missing-profile-checklist";
import { OnboardingNavigation } from "@/components/candidate/onboarding-navigation";
import { OnboardingShell } from "@/components/candidate/onboarding-shell";
import { OnboardingStepHeader } from "@/components/candidate/onboarding-step-header";
import { ParsedResumeEditor } from "@/components/candidate/parsed-resume-editor";
import { PrivacySettingsPanel } from "@/components/candidate/privacy-settings-panel";
import { ResumeUploadDropzone } from "@/components/candidate/resume-upload-dropzone";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toaster";
import type { ProfileCompletenessResult } from "@/lib/profile-completeness";

const TOTAL_STEPS = 4;

export function CandidateOnboardingFlow({
  candidateProfileId,
  initialStep,
  initialDraft,
  initialPrivacy,
  completeness
}: {
  candidateProfileId: string;
  initialStep: number;
  initialDraft: Record<string, any>;
  initialPrivacy: {
    searchable: boolean;
    showExactCity: boolean;
    companyMode: "EXACT" | "MASKED" | "INDUSTRY_ONLY";
    revealEducationInstitution: boolean;
    revealGraduationYear: boolean;
    allowMessagingOnly: boolean;
    blockedDomains: string[];
  };
  completeness: ProfileCompletenessResult;
}) {
  const router = useRouter();
  const { pushToast } = useToast();
  const [draft, setDraft] = useState(initialDraft);
  const [step, setStep] = useState(Math.min(Math.max(initialStep, 1), TOTAL_STEPS));
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setStep(Math.min(Math.max(initialStep, 1), TOTAL_STEPS));
  }, [initialStep]);

  const stepMeta = useMemo(
    () => [
      {
        title: "Upload a resume or start with your basics",
        description: "Bring in your latest resume and we’ll turn it into a private draft profile you can edit before publishing."
      },
      {
        title: "Review your experience, skills, and preferences",
        description: "Clean up the parsed details so employers see a strong anonymous profile that still protects your identity."
      },
      {
        title: "Set your privacy preferences",
        description: "Choose how much employers can see and how they can contact you after approval."
      },
      {
        title: "Publish your profile",
        description: "Review what’s still missing, then finish onboarding and head to your dashboard."
      }
    ],
    []
  );

  const persistStep = (nextStep: number) =>
    startTransition(async () => {
      await saveOnboardingStep(candidateProfileId, nextStep);
      setStep(nextStep);
      router.refresh();
    });

  const publishProfile = () =>
    startTransition(async () => {
      await completeCandidateOnboarding(candidateProfileId);
      pushToast({ title: "Profile published", description: "Your onboarding is complete. You can keep improving your visibility from the dashboard." });
      router.push("/candidate/dashboard");
      router.refresh();
    });

  return (
    <OnboardingShell
      badge="Candidate onboarding"
      title="Build your anonymous profile in a few quick steps"
      description="You stay private by default. We’ll guide you through the profile details that matter most so verified employers can evaluate your fit without seeing your identity."
      progress={<CompletionProgressBar score={completeness.score} />}
      aside={
        <>
          <Card className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Why this matters</p>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-4 w-4 text-primary" />
                Complete profiles are easier for employers to shortlist.
              </div>
              <div className="flex items-start gap-3">
                <Lock className="mt-0.5 h-4 w-4 text-primary" />
                Your name and contact details stay hidden until you approve access.
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                A few quick updates can significantly improve discoverability.
              </div>
            </div>
          </Card>
          <Card className="space-y-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Still missing</p>
            <MissingProfileChecklist items={completeness.suggestedNextActions} compact />
          </Card>
        </>
      }
    >
      <OnboardingStepHeader
        step={step}
        totalSteps={TOTAL_STEPS}
        title={stepMeta[step - 1].title}
        description={stepMeta[step - 1].description}
      />

      {step === 1 ? (
        <div className="space-y-6">
          <ResumeUploadDropzone onParsed={(parsed) => setDraft(parsed)} />
          <Card className="space-y-3 bg-slate-50/80 dark:bg-slate-900/50">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              You can also continue without a resume
            </div>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              If you’d rather start manually, continue to the next step and fill in your profile details directly.
            </p>
          </Card>
          <OnboardingNavigation nextLabel="Review profile details" onNext={() => persistStep(2)} isSubmitting={isPending} />
        </div>
      ) : null}

      {step === 2 ? (
        <div id="editor">
          <ParsedResumeEditor
            candidateProfileId={candidateProfileId}
            initialValue={draft}
            submitLabel="Save and continue"
            onSaved={() => persistStep(3)}
          />
          <OnboardingNavigation canGoBack onBack={() => setStep(1)} nextLabel="Go to privacy settings" onNext={() => persistStep(3)} isSubmitting={isPending} />
        </div>
      ) : null}

      {step === 3 ? (
        <div id="privacy">
          <PrivacySettingsPanel
            candidateProfileId={candidateProfileId}
            initial={initialPrivacy}
            submitLabel="Save and review profile"
            onSaved={() => persistStep(4)}
          />
          <OnboardingNavigation canGoBack onBack={() => setStep(2)} nextLabel="Review final step" onNext={() => persistStep(4)} isSubmitting={isPending} />
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-6">
          <Card className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Ready to publish</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">You’re close to becoming searchable</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Finish onboarding to land on your dashboard. You can keep improving your profile afterward at any time.
              </p>
            </div>
            <CompletionProgressBar score={completeness.score} />
            <MissingProfileChecklist items={completeness.missingSections.slice(0, 6)} />
            <div className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-4 text-sm text-sky-900 dark:border-sky-900/40 dark:bg-sky-950/30 dark:text-sky-100">
              Your contact details remain hidden by default. Employers only reach you through approved requests.
            </div>
          </Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ButtonLink href="/candidate/dashboard" label="Skip to dashboard" />
            <OnboardingNavigation
              canGoBack
              backLabel="Back to privacy"
              nextLabel="Finish onboarding"
              onBack={() => setStep(3)}
              onNext={publishProfile}
              isSubmitting={isPending}
            />
          </div>
        </div>
      ) : null}
    </OnboardingShell>
  );
}

function ButtonLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
    >
      {label}
    </Link>
  );
}
