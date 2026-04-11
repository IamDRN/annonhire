import { candidateSteps, employerSteps } from "@/components/marketing/homepage-data";
import { MarketingSection, SectionHeading, StepItem } from "@/components/marketing/home-shared";

export function HomeHowItWorks() {
  return (
    <MarketingSection id="how-it-works" className="bg-white dark:bg-slate-950">
      <SectionHeading
        eyebrow="How it works"
        title="Simple for candidates. Powerful for employers."
        description="A guided privacy-first workflow that helps both sides connect with confidence."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 p-8 dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-6 inline-flex rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-slate-900">
            For Candidates
          </div>
          <div className="space-y-6">
            {candidateSteps.map((step) => (
              <StepItem key={step.step} {...step} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 p-8 dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-6 inline-flex rounded-full border border-slate-300 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            For Employers
          </div>
          <div className="space-y-6">
            {employerSteps.map((step) => (
              <StepItem key={step.step} {...step} />
            ))}
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}
