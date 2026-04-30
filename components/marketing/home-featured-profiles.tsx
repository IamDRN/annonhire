import Link from "next/link";
import { featuredProfiles } from "@/components/marketing/homepage-data";
import { InfoItem, MarketingSection, SectionHeading, SkillTag } from "@/components/marketing/home-shared";

export function HomeFeaturedProfiles() {
  return (
    <MarketingSection id="browse-talent" className="bg-white dark:bg-slate-950">
      <SectionHeading
        eyebrow="Featured anonymous profiles"
        title="Preview the quality employers see before contact is revealed"
        description="Every profile stays privacy-safe, but still gives enough depth for employers to assess fit, skills, and readiness."
      />

      <div className="mt-14 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {featuredProfiles.slice(0, 2).map((profile, index) => (
            <div
              key={profile.id}
              className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-34px_rgba(15,23,42,0.24)] transition duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-[0_24px_44px_-32px_rgba(108,99,255,0.34)] dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-bold text-primary dark:bg-slate-900 dark:text-sky-300">
                    AH
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                        {profile.id}
                      </p>
                      {index === 0 ? (
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-primary dark:bg-slate-800 dark:text-sky-300">
                          Featured
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{profile.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {profile.experience} · {profile.location}
                    </p>
                  </div>
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Anonymous
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <SkillTag key={skill} label={skill} />
                ))}
              </div>

              <div className="mt-6 grid gap-3 rounded-[1.25rem] border border-slate-200 bg-[#fafbff] p-4 dark:border-slate-800 dark:bg-slate-900/70 md:grid-cols-2">
                <InfoItem label="Expected Salary" value={profile.salary} />
                <InfoItem label="Notice Period" value={profile.notice} />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/employer/search"
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-24px_rgba(108,99,255,0.72)] transition hover:-translate-y-0.5 hover:bg-[#5d55ef]"
                >
                  Request Contact
                </Link>
                <Link
                  href="/candidate/profile/AH-2041"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary dark:border-slate-700 dark:text-slate-200"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-[#f8f9fd] p-6 shadow-[0_22px_46px_-40px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-900">
          <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-sky-300">Search preview</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">What employers can assess instantly</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Skills, experience, location preference, compensation, availability, and privacy-safe work history help
              employers move from curiosity to a respectful contact request.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Structured skills that match search filters",
                "Masked employers with industry-level context",
                "Notice period and work mode preferences",
                "Candidate-controlled privacy settings"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#fafbff] px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.3rem] bg-slate-950 p-5 text-white dark:bg-slate-900">
              <p className="text-sm font-semibold">Privacy-first hiring works best when trust is obvious.</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                AnonHire keeps identity protected until the candidate explicitly approves employer access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}
