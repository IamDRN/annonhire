import Link from "next/link";
import { featuredProfiles } from "@/components/marketing/homepage-data";
import { InfoItem, MarketingSection, SectionHeading, SkillTag } from "@/components/marketing/home-shared";

export function HomeFeaturedProfiles() {
  return (
    <MarketingSection id="browse-talent" className="bg-slate-50 dark:bg-slate-900/30">
      <SectionHeading
        eyebrow="Featured anonymous profiles"
        title="Preview how candidate discovery works"
        description="Employers browse structured, anonymous profiles and request contact only when genuinely interested."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {featuredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{profile.id}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{profile.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {profile.experience} · {profile.location}
                </p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                Anonymous
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>

            <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <InfoItem label="Expected Salary" value={profile.salary} />
              <InfoItem label="Notice Period" value={profile.notice} />
            </div>

            <Link
              href="/employer/search"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </MarketingSection>
  );
}
