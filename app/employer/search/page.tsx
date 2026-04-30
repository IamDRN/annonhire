import { CandidateCard } from "@/components/employer/candidate-card";
import { EmptyJobState } from "@/components/employer/empty-job-state";
import { JobFilterSidebar } from "@/components/employer/job-filter-sidebar";
import { JobSearchHeader } from "@/components/employer/job-search-header";
import { ResultsHeader } from "@/components/employer/results-header";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Card } from "@/components/ui/card";
import { WorkMode } from "@prisma/client";
import { getCurrentSession } from "@/lib/auth/session";
import { canEmployerSearch, employerSearchMeta, searchEmployerCandidates } from "@/lib/search/search-engine";
import { getEmployerDashboard } from "@/services/dashboard-service";
import type { CandidateCardView } from "@/types";

export default async function EmployerSearchPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getCurrentSession();
  if (!session?.user) {
    return null;
  }

  const params = await searchParams;
  const filters = {
    keyword: typeof params.keyword === "string" ? params.keyword : undefined,
    skills: typeof params.skills === "string" ? params.skills.split(",").map((item) => item.trim()).filter(Boolean) : undefined,
    location: typeof params.location === "string" ? params.location : undefined,
    workMode: typeof params.workMode === "string" ? (params.workMode as WorkMode) : undefined,
    workModes: typeof params.workModes === "string" ? (params.workModes.split(",").filter(Boolean) as WorkMode[]) : undefined,
    experienceLevels:
      typeof params.experienceLevels === "string"
        ? (params.experienceLevels.split(",").filter(Boolean) as ("entry" | "mid" | "senior" | "manager" | "director")[])
        : undefined,
    categories:
      typeof params.categories === "string"
        ? (params.categories.split(",").filter(Boolean) as CandidateCardView["category"][])
        : undefined,
    yearsMin: typeof params.yearsMin === "string" ? Number(params.yearsMin) : undefined,
    yearsMax: typeof params.yearsMax === "string" ? Number(params.yearsMax) : undefined,
    salaryMin: typeof params.salaryMin === "string" ? Number(params.salaryMin) : undefined,
    salaryMax: typeof params.salaryMax === "string" ? Number(params.salaryMax) : undefined,
    noticePeriod: typeof params.noticePeriod === "string" ? (params.noticePeriod as any) : undefined,
    education: typeof params.education === "string" ? params.education : undefined,
    profileCompleteness: typeof params.profileCompleteness === "string" ? Number(params.profileCompleteness) : undefined,
    availability: typeof params.availability === "string" ? params.availability : undefined,
    sortBy: typeof params.sortBy === "string" ? (params.sortBy as any) : "best_match"
  };

  const [allowed, employerProfile, candidates, allCandidates] = await Promise.all([
    canEmployerSearch(session.user.id),
    getEmployerDashboard(session.user.id),
    searchEmployerCandidates(session.user.id, filters),
    searchEmployerCandidates(session.user.id, { sortBy: "best_match" })
  ]);

  const counts = buildCounts(allCandidates.results);
  const previewCandidates = allowed ? candidates.results : allCandidates.results.slice(0, 3);

  return (
    <ProtectedRoute allow={["EMPLOYER"]}>
      <main className="min-h-screen bg-[#F8FAFC] py-8 md:py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <JobSearchHeader
            initialKeyword={filters.keyword}
            initialLocation={filters.location}
            hintChips={[...employerSearchMeta.hintChips]}
          />
          <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className={!allowed ? "pointer-events-none opacity-60" : undefined}>
              <JobFilterSidebar initial={filters} counts={counts} />
            </div>
            <div className="space-y-6">
              {!allowed ? (
                <Card className="rounded-[28px] border-[#d9d6ff] bg-gradient-to-r from-white to-[#f7f5ff] shadow-[0_14px_34px_rgba(108,99,255,0.09)]">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="inline-flex rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#6C63FF]">
                        Verification required
                      </div>
                      <h2 className="mt-3 text-2xl font-semibold text-slate-900">Preview the search experience while your company is being reviewed.</h2>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Once verification is complete, you’ll unlock full filters, real match scoring, saved candidates, and private outreach.
                      </p>
                    </div>
                    <a
                      href="/employer/dashboard#company"
                      className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#6C63FF] px-5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(108,99,255,0.28)] transition hover:-translate-y-0.5 hover:bg-[#5b52f5]"
                    >
                      Review company profile
                    </a>
                  </div>
                </Card>
              ) : null}

              <ResultsHeader count={allowed ? candidates.results.length : previewCandidates.length} sortBy={filters.sortBy} />
              {previewCandidates.length ? (
                <div className="relative space-y-5">
                  {previewCandidates.map((candidate) => (
                    <div key={candidate.id} className={!allowed ? "select-none blur-[1.5px]" : undefined}>
                      <CandidateCard
                        candidate={candidate}
                        employerProfileId={allowed ? candidates.employerProfileId ?? employerProfile?.id : undefined}
                      />
                    </div>
                  ))}
                  {!allowed ? (
                    <div className="pointer-events-none absolute inset-x-0 top-12 flex justify-center px-4">
                      <div className="max-w-xl rounded-[28px] border border-slate-200 bg-white/95 px-6 py-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.14)] backdrop-blur">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6C63FF]">Search access locked</p>
                        <h3 className="mt-3 text-xl font-semibold text-slate-900">Anonymous candidate matching unlocks after verification.</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          You’re seeing a preview of the redesigned search UI. Verify your employer account to use filters, save candidates, and send HIRE ME requests.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <EmptyJobState />
              )}
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

function buildCounts(candidates: CandidateCardView[]) {
  const workModes = employerSearchMeta.workModeOptions.map((option) => ({
    label: option.label,
    value: option.value,
    count: candidates.filter((candidate) => candidate.workMode === option.value).length
  }));

  const experienceLevels = [
    { label: "Entry Level", value: "entry" },
    { label: "Mid Level", value: "mid" },
    { label: "Senior Level", value: "senior" },
    { label: "Manager", value: "manager" },
    { label: "Director", value: "director" }
  ].map((option) => ({
    ...option,
    count: candidates.filter((candidate) => normalizeExperienceLabel(candidate.experienceLevel) === option.value).length
  }));

  const categories = employerSearchMeta.categoryOptions.map((option) => ({
    label: option,
    value: option,
    count: candidates.filter((candidate) => candidate.category === option).length
  }));

  return {
    workModes,
    experienceLevels,
    categories
  };
}

function normalizeExperienceLabel(label: CandidateCardView["experienceLevel"]) {
  if (label === "Entry Level") return "entry";
  if (label === "Mid Level") return "mid";
  if (label === "Senior Level") return "senior";
  if (label === "Manager") return "manager";
  return "director";
}
