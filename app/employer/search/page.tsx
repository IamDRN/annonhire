import { CandidateCard } from "@/components/employer/candidate-card";
import { SearchFilters } from "@/components/employer/search-filters";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { WorkMode } from "@prisma/client";
import { getCurrentSession } from "@/lib/auth/session";
import { candidateSearchProvider, canEmployerSearch } from "@/lib/search/search-engine";
import { getEmployerDashboard } from "@/services/dashboard-service";

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
    industry: typeof params.industry === "string" ? params.industry : undefined,
    location: typeof params.location === "string" ? params.location : undefined,
    workMode: typeof params.workMode === "string" ? (params.workMode as WorkMode) : undefined,
    sortBy: typeof params.sortBy === "string" ? (params.sortBy as any) : "best_match"
  };

  const [allowed, employerProfile, candidates] = await Promise.all([
    canEmployerSearch(session.user.id),
    getEmployerDashboard(session.user.id),
    candidateSearchProvider.search(filters)
  ]);

  return (
    <ProtectedRoute allow={["EMPLOYER"]}>
      <main className="container-width py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Search anonymous candidates</h1>
          <p className="mt-2 text-sm text-muted">Verified employers can search by skills, experience, location, privacy-safe profile fields, and availability.</p>
        </div>
        {!allowed ? (
          <Card>
            <h2 className="text-xl font-semibold">Verification required</h2>
            <p className="mt-3 text-sm text-muted">Your employer profile is still pending review. Once verified, you’ll unlock the full candidate search database.</p>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <SearchFilters initial={filters} />
            <div className="space-y-6">
              {candidates.length ? (
                candidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} employerProfileId={employerProfile?.id} />
                ))
              ) : (
                <EmptyState title="No candidates found" description="Try broader filters or save this search for later." />
              )}
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
