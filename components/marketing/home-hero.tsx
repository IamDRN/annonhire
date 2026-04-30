import { Lock, Search, ShieldCheck, Sparkles } from "lucide-react";
import { InfoItem, MarketingLinkButton, MarketingSection, SkillTag } from "@/components/marketing/home-shared";
import { BrandLogo } from "@/components/ui/brand-logo";

export function HomeHero() {
  return (
    <MarketingSection className="overflow-hidden border-b-0 bg-[#f7f8fc] pb-10 pt-10 dark:bg-slate-950">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_40px_90px_-50px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
        <div className="absolute right-8 top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative rounded-[1.8rem] border border-slate-200/90 bg-[#f8f9fd] p-5 shadow-[0_30px_70px_-52px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900 lg:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
            <BrandLogo linked={false} imageClassName="h-10 sm:h-11" priority />
            <div className="hidden items-center gap-3 md:flex">
              <span className="text-sm text-slate-500 dark:text-slate-400">Anonymous hiring, done right</span>
              <MarketingLinkButton href="/employer/search" variant="secondary">
                Search Talent
              </MarketingLinkButton>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-sky-300">
                <Lock className="h-4 w-4" />
                Candidate identities stay hidden until they say yes.
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl lg:text-[3.55rem] dark:text-white">
                Find privacy-first opportunities built around your skills.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg dark:text-slate-300">
                Explore verified roles, upload your resume anonymously, and let employers discover your fit before
                they ever see your identity.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <MarketingLinkButton href="/candidate/signup">Upload Resume</MarketingLinkButton>
                <MarketingLinkButton href="/employer/search" variant="secondary">
                  Search Talent
                </MarketingLinkButton>
              </div>

              <div className="mt-7 flex flex-wrap gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                {["Front-End", "HR", "Finance", "Remote", "React", "Sales"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-[0_25px_50px_-40px_rgba(15,23,42,0.25)] dark:border-slate-800 dark:bg-slate-950">
                <div className="rounded-[1.35rem] bg-[#f5f7fd] p-4 dark:bg-slate-900">
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  </div>

                  <div className="mt-5 rounded-[1.3rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                      <Search className="h-4 w-4 text-slate-400" />
                      <span className="flex-1 text-sm text-slate-400">Search by skill, title, or notice period</span>
                      <span className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white">Search</span>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary dark:bg-slate-800 dark:text-sky-300">
                          Candidate #AH-2041
                        </span>
                        <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Senior HR Officer</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          5 years experience · Kathmandu preferred
                        </p>
                      </div>
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                        Privacy Protected
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Recruitment", "Payroll", "Labor Law", "HRIS"].map((skill) => (
                        <SkillTag key={skill} label={skill} />
                      ))}
                    </div>

                    <div className="mt-5 grid gap-3 rounded-[1.15rem] border border-slate-200 bg-[#fbfcff] p-4 dark:border-slate-800 dark:bg-slate-900/70">
                      <InfoItem label="Location" value="Bagmati or remote" />
                      <InfoItem label="Salary Range" value="NPR 55K-75K" />
                      <InfoItem label="Work Mode" value="Remote / Hybrid" />
                      <InfoItem label="Notice Period" value="30 days" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 hidden w-56 rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_22px_45px_-34px_rgba(15,23,42,0.28)] md:block dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-primary dark:bg-slate-800 dark:text-sky-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Trusted hiring flow</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">You control when employers can reach you.</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-10 hidden w-44 rounded-[1.2rem] border border-slate-200 bg-white p-4 shadow-[0_22px_45px_-34px_rgba(15,23,42,0.28)] xl:block dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-2 text-primary dark:text-sky-300">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em]">Search Ready</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">Verified employers only</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Employers see your strengths first, not your personal details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}
