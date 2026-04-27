"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { CheckCircle2, FileText, Lock, ShieldCheck, Sparkles } from "lucide-react";
import {
  completeCandidateOnboarding,
  saveCandidateOnboardingBasics,
  saveCandidateOnboardingPrivacy,
  saveCandidateOnboardingSkills
} from "@/actions/candidate-profile";
import { OnboardingShell } from "@/components/candidate/onboarding-shell";
import { OnboardingStepHeader } from "@/components/candidate/onboarding-step-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toaster";

const TOTAL_STEPS = 5;
const SKILL_SUGGESTIONS = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Figma",
  "Product Design",
  "Project Management",
  "SQL",
  "Customer Success",
  "Digital Marketing"
];

type OnboardingFormValues = {
  fullName: string;
  headline: string;
  skills: string[];
  yearsOfExperience: number;
  showEmail: boolean;
  showPhone: boolean;
  resumeFileName: string;
  resumeFileUrl: string;
};

export function CandidateOnboardingFlow({
  candidateProfileId,
  initialStep,
  initialValues
}: {
  candidateProfileId: string;
  initialStep: number;
  initialValues: OnboardingFormValues;
}) {
  const router = useRouter();
  const { pushToast } = useToast();
  const [step, setStep] = useState(Math.min(Math.max(initialStep, 1), TOTAL_STEPS));
  const [customSkill, setCustomSkill] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    watch,
    trigger,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<OnboardingFormValues>({
    defaultValues: initialValues
  });

  const values = watch();
  const stepMeta = useMemo(
    () => [
      {
        title: "Start with your basics",
        description: "Tell employers who you are without exposing your identity publicly.",
        icon: Sparkles
      },
      {
        title: "Highlight your skills and experience",
        description: "Add the strengths employers will use to discover you in search.",
        icon: ShieldCheck
      },
      {
        title: "Upload your resume",
        description: "Attach your latest resume so your private profile stays rich and current.",
        icon: FileText
      },
      {
        title: "Choose your privacy settings",
        description: "Stay in control of what happens after an employer request is approved.",
        icon: Lock
      },
      {
        title: "Review and submit",
        description: "Make sure everything looks right, then finish onboarding and head to your dashboard.",
        icon: CheckCircle2
      }
    ],
    []
  );

  const progressPercent = Math.round((step / TOTAL_STEPS) * 100);

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
  };

  const handleNext = () => {
    startTransition(async () => {
      if (step === 1) {
        const valid = await trigger(["fullName", "headline"]);
        if (!valid) return;

        await saveCandidateOnboardingBasics(candidateProfileId, {
          fullName: getValues("fullName"),
          headline: getValues("headline")
        });
        goToStep(2);
        router.refresh();
        return;
      }

      if (step === 2) {
        const valid = await trigger(["skills", "yearsOfExperience"]);
        if (!valid || getValues("skills").length === 0) return;

        await saveCandidateOnboardingSkills(candidateProfileId, {
          skills: getValues("skills"),
          yearsOfExperience: Number(getValues("yearsOfExperience"))
        });
        goToStep(3);
        router.refresh();
        return;
      }

      if (step === 3) {
        if (!getValues("resumeFileName")) {
          pushToast({ title: "Resume required", description: "Please upload a resume before continuing." });
          return;
        }

        goToStep(4);
        return;
      }

      if (step === 4) {
        await saveCandidateOnboardingPrivacy(candidateProfileId, {
          showEmail: Boolean(getValues("showEmail")),
          showPhone: Boolean(getValues("showPhone"))
        });
        goToStep(5);
        router.refresh();
      }
    });
  };

  const handleSubmit = () =>
    startTransition(async () => {
      await completeCandidateOnboarding(candidateProfileId);
      pushToast({ title: "Onboarding complete", description: "Your profile is ready. You can keep refining it from the dashboard." });
      router.push("/candidate/dashboard");
      router.refresh();
    });

  const toggleSkill = (skill: string) => {
    const current = getValues("skills");
    const next = current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill];
    setValue("skills", next, { shouldValidate: true });
  };

  const addCustomSkill = () => {
    const value = customSkill.trim();
    if (!value) return;

    const current = getValues("skills");
    if (!current.includes(value)) {
      setValue("skills", [...current, value], { shouldValidate: true });
    }
    setCustomSkill("");
  };

  const uploadResume = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        pushToast({ title: "Upload failed", description: "Please use a PDF, DOC, or DOCX under 5MB." });
        return;
      }

      const data = await response.json();
      setValue("resumeFileName", file.name, { shouldValidate: true });
      setValue("resumeFileUrl", data.fileUrl ?? "", { shouldValidate: false });

      if (!getValues("fullName") && data.parsed?.fullName) {
        setValue("fullName", data.parsed.fullName, { shouldValidate: true });
      }
      if (!getValues("headline") && data.parsed?.headline) {
        setValue("headline", data.parsed.headline, { shouldValidate: true });
      }
      if ((getValues("skills")?.length ?? 0) === 0 && Array.isArray(data.parsed?.skills)) {
        setValue("skills", data.parsed.skills, { shouldValidate: true });
      }
      if (!getValues("yearsOfExperience") && typeof data.parsed?.yearsOfExperience === "number") {
        setValue("yearsOfExperience", data.parsed.yearsOfExperience, { shouldValidate: true });
      }

      pushToast({ title: "Resume uploaded", description: "Your resume has been saved to your private profile." });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <OnboardingShell
      badge="Candidate onboarding"
      title="Create your anonymous profile"
      description="This quick setup helps verified employers discover your fit while you stay in control of what gets revealed and when."
      progress={<StepProgressBar currentStep={step} totalSteps={TOTAL_STEPS} percent={progressPercent} />}
      aside={
        <div className="space-y-6">
          <Card className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Why candidates like this</p>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                Your public profile stays anonymous by default.
              </div>
              <div className="flex items-start gap-3">
                <Lock className="mt-0.5 h-4 w-4 text-primary" />
                You decide whether email or phone is shared after approval.
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                Better profiles get discovered faster by trusted employers.
              </div>
            </div>
          </Card>
          <Card className="space-y-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Step checklist</p>
            <div className="space-y-3">
              {stepMeta.map((item, index) => {
                const Icon = item.icon;
                const itemStep = index + 1;
                const isActive = itemStep === step;
                const isDone = itemStep < step;

                return (
                  <div
                    key={item.title}
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-3 ${
                      isActive
                        ? "border-sky-200 bg-sky-50 dark:border-sky-900/40 dark:bg-sky-950/30"
                        : "border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/40"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-2xl ${
                        isDone ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200" : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Step {itemStep}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      }
    >
      <OnboardingStepHeader
        step={step}
        totalSteps={TOTAL_STEPS}
        title={stepMeta[step - 1].title}
        description={stepMeta[step - 1].description}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="space-y-6"
        >
          {step === 1 ? (
            <Card className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="fullName">Name</Label>
                  <Input
                    id="fullName"
                    className="mt-2 h-12 rounded-2xl"
                    placeholder="Your full name"
                    {...register("fullName", { required: "Name is required", minLength: 2 })}
                  />
                  {errors.fullName ? <FieldError message={errors.fullName.message} /> : null}
                </div>
                <div>
                  <Label htmlFor="headline">Current role</Label>
                  <Input
                    id="headline"
                    className="mt-2 h-12 rounded-2xl"
                    placeholder="Senior Product Designer"
                    {...register("headline", { required: "Current role is required", minLength: 2 })}
                  />
                  {errors.headline ? <FieldError message={errors.headline.message} /> : null}
                </div>
              </div>
              <NavigationRow
                onNext={handleNext}
                isPending={isPending}
                nextLabel="Continue to skills"
              />
            </Card>
          ) : null}

          {step === 2 ? (
            <Card className="space-y-5">
              <div>
                <Label>Skills</Label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SKILL_SUGGESTIONS.map((skill) => {
                    const selected = values.skills?.includes(skill);

                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                          selected
                            ? "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900/40 dark:bg-sky-950/40 dark:text-sky-200"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex gap-3">
                  <Input
                    value={customSkill}
                    onChange={(event) => setCustomSkill(event.target.value)}
                    placeholder="Add a custom skill"
                    className="h-12 rounded-2xl"
                  />
                  <Button type="button" variant="outline" onClick={addCustomSkill}>
                    Add
                  </Button>
                </div>
                {(values.skills?.length ?? 0) > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {values.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}
                {(values.skills?.length ?? 0) === 0 ? <FieldError message="Select at least one skill." /> : null}
              </div>
              <div>
                <Label htmlFor="yearsOfExperience">Years of experience</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  className="mt-2 h-12 rounded-2xl"
                  {...register("yearsOfExperience", {
                    valueAsNumber: true,
                    required: "Experience is required",
                    min: 0,
                    max: 50
                  })}
                />
                {errors.yearsOfExperience ? <FieldError message={errors.yearsOfExperience.message} /> : null}
              </div>
              <NavigationRow
                onBack={() => goToStep(1)}
                onNext={handleNext}
                isPending={isPending}
                backLabel="Back"
                nextLabel="Continue to resume"
              />
            </Card>
          ) : null}

          {step === 3 ? (
            <Card className="space-y-5">
              <div
                className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/50"
              >
                <FileText className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">Upload your resume</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  PDF, DOC, and DOCX are supported. Your resume stays private and is only used to enrich your profile.
                </p>
                <label className="mt-6 inline-flex cursor-pointer items-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
                  {isUploading ? "Uploading..." : values.resumeFileName ? "Replace resume" : "Choose file"}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        void uploadResume(file);
                      }
                    }}
                  />
                </label>
              </div>
              {values.resumeFileName ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200">
                  Resume saved: <span className="font-semibold">{values.resumeFileName}</span>
                </div>
              ) : null}
              <NavigationRow
                onBack={() => goToStep(2)}
                onNext={handleNext}
                isPending={isPending || isUploading}
                backLabel="Back"
                nextLabel="Continue to privacy"
              />
            </Card>
          ) : null}

          {step === 4 ? (
            <Card className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <PrivacyToggle
                  label="Show email after approval"
                  description="Reveal your email only after you accept an employer request."
                  checked={values.showEmail}
                  onChange={(checked) => setValue("showEmail", checked, { shouldValidate: true })}
                />
                <PrivacyToggle
                  label="Show phone after approval"
                  description="Keep phone hidden unless you explicitly want to share it after approval."
                  checked={values.showPhone}
                  onChange={(checked) => setValue("showPhone", checked, { shouldValidate: true })}
                />
              </div>
              <div className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-4 text-sm text-sky-900 dark:border-sky-900/40 dark:bg-sky-950/30 dark:text-sky-100">
                These settings define your preferred contact behavior after an approved request. Your profile stays anonymous in search results.
              </div>
              <NavigationRow
                onBack={() => goToStep(3)}
                onNext={handleNext}
                isPending={isPending}
                backLabel="Back"
                nextLabel="Continue to review"
              />
            </Card>
          ) : null}

          {step === 5 ? (
            <Card className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <ReviewRow label="Name" value={values.fullName} />
                <ReviewRow label="Current role" value={values.headline} />
                <ReviewRow label="Experience" value={`${values.yearsOfExperience} years`} />
                <ReviewRow label="Resume" value={values.resumeFileName || "Not uploaded"} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Skills</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {values.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <ReviewRow label="Show email after approval" value={values.showEmail ? "Yes" : "No"} />
                <ReviewRow label="Show phone after approval" value={values.showPhone ? "Yes" : "No"} />
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200">
                Everything looks good. Submit to finish onboarding and jump straight into your dashboard.
              </div>
              <NavigationRow
                onBack={() => goToStep(4)}
                onNext={handleSubmit}
                isPending={isPending}
                backLabel="Back"
                nextLabel="Submit and go to dashboard"
              />
            </Card>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </OnboardingShell>
  );
}

function StepProgressBar({
  currentStep,
  totalSteps,
  percent
}: {
  currentStep: number;
  totalSteps: number;
  percent: number;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{percent}% complete</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-primary to-cyan-400"
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function NavigationRow({
  onBack,
  onNext,
  isPending,
  backLabel = "Back",
  nextLabel = "Continue"
}: {
  onBack?: () => void;
  onNext: () => void;
  isPending: boolean;
  backLabel?: string;
  nextLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 dark:border-slate-800">
      <Button type="button" variant="ghost" onClick={onBack} disabled={!onBack || isPending}>
        {backLabel}
      </Button>
      <Button type="button" onClick={onNext} disabled={isPending}>
        {isPending ? "Saving..." : nextLabel}
      </Button>
    </div>
  );
}

function PrivacyToggle({
  label,
  description,
  checked,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`rounded-3xl border p-5 text-left transition ${
        checked
          ? "border-sky-200 bg-sky-50 dark:border-sky-900/40 dark:bg-sky-950/30"
          : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-white">{label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <div
          className={`mt-1 h-6 w-11 rounded-full p-1 transition ${
            checked ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"
          }`}
        >
          <div
            className={`h-4 w-4 rounded-full bg-white transition ${checked ? "translate-x-5" : "translate-x-0"}`}
          />
        </div>
      </div>
    </button>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/50">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">{message}</p>;
}
