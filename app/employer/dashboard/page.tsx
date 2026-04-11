import { UserRole } from "@prisma/client";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RequestStatusBadge } from "@/components/employer/request-status-badge";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Card } from "@/components/ui/card";
import { getCurrentSession } from "@/lib/auth/session";
import { getEmployerDashboard } from "@/services/dashboard-service";
import { getEmployerSearchDashboard } from "@/lib/search/search-engine";

export default async function EmployerDashboardPage() {
  const session = await getCurrentSession();
  if (!session?.user) {
    return null;
  }

  const [profile, dashboard] = await Promise.all([
    getEmployerDashboard(session.user.id),
    getEmployerSearchDashboard(session.user.id)
  ]);

  return (
    <ProtectedRoute allow={[UserRole.EMPLOYER]}>
      <main className="container-width grid gap-6 py-10 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar role="employer" />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Employer dashboard</h1>
            <p className="mt-2 text-sm text-muted">Manage verification, search access, saved candidates, and outbound contact requests.</p>
          </div>
          <StatsCards
            items={[
              { label: "Verification", value: profile?.verificationStatus ?? "PENDING", hint: "Only verified employers can access the full search database." },
              { label: "Requests sent", value: dashboard.metrics.requestsSent, hint: "Structured HIRE ME requests sent to candidates." },
              { label: "Saved candidates", value: dashboard.metrics.savedCandidates, hint: "Shortlisted anonymous profiles." },
              { label: "Saved searches", value: dashboard.metrics.savedSearches, hint: "Reusable talent search criteria." }
            ]}
          />
          <Card id="company">
            <h2 className="text-xl font-semibold">Company profile</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
              <p>Company: {profile?.company.name}</p>
              <p>Website: {profile?.website ?? "Not added"}</p>
              <p>Work email: {profile?.workEmail}</p>
              <p>Team members: Placeholder</p>
            </div>
          </Card>
          <Card id="requests">
            <h2 className="text-xl font-semibold">Recent contact requests</h2>
            <div className="mt-5 space-y-4">
              {profile?.sentRequests.map((request) => (
                <div key={request.id} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted">{request.candidateProfile.anonymousId}</p>
                      <p className="font-medium">{request.jobTitle}</p>
                    </div>
                    <RequestStatusBadge status={request.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h2 className="text-xl font-semibold">Billing</h2>
              <p className="mt-3 text-sm text-muted">Placeholder for subscription plans, invoices, and recruiter seats.</p>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold">Team members</h2>
              <p className="mt-3 text-sm text-muted">Placeholder for recruiter invites, permissions, and activity logs.</p>
            </Card>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
