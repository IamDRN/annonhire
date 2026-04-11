import { Lock } from "lucide-react";
import { InfoItem, MarketingLinkButton, MarketingSection, SkillTag, TrustPill } from "@/components/marketing/home-shared";

export function HomeHero() {
  return (
    <MarketingSection className="overflow-hidden bg-white dark:bg-slate-950">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <Lock className="h-4 w-4" />
            Anonymous profiles. Candidate-controlled contact sharing.
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl dark:text-white">
            Upload your resume anonymously. Let employers find your skills.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Stay private until you choose to connect. Employers search candidates by skills, experience, and fit
            through a secure HIRE ME flow.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MarketingLinkButton href="/candidate/signup">Upload Resume</MarketingLinkButton>
            <MarketingLinkButton href="/employer/signup" variant="secondary">
              For Employers
            </MarketingLinkButton>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <TrustPill label="No public phone number" />
            <TrustPill label="No public email" />
            <TrustPill label="You approve contact" />
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    Candidate #AH-2041
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">Senior HR Officer</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">5 Years Experience · Kathmandu</p>
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                  Privacy Protected
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {["Recruitment", "Payroll", "Labor Law", "HR Operations", "Excel"].map((skill) => (
                  <SkillTag key={skill} label={skill} />
                ))}
              </div>

              <div className="grid gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 md:grid-cols-2">
                <InfoItem label="Current Company" value="Masked Employer" />
                <InfoItem label="Education" value="Bachelor's Degree" />
                <InfoItem label="Salary Expectation" value="NPR 55K-75K" />
                <InfoItem label="Notice Period" value="30 Days" />
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Interested in this profile?</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Request contact without revealing the candidate&apos;s identity.
                  </p>
                </div>
                <MarketingLinkButton href="/employer/search">HIRE ME</MarketingLinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}
