import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/session";
import { getAdminDashboard } from "@/services/dashboard-service";

export default async function AdminDashboardPage() {
  await requireRole(["ADMIN"]);
  const data = await getAdminDashboard();

  return (
    <ProtectedRoute allow={["ADMIN"]}>
      <main className="container-width grid gap-6 py-10 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar role="admin" />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Admin dashboard</h1>
            <p className="mt-2 text-sm text-muted">Moderate employers, review candidate flags, inspect audit events, and monitor platform activity.</p>
          </div>
          <StatsCards
            items={[
              { label: "Employer approvals", value: data.pendingEmployers.length, hint: "Verification requests awaiting review." },
              { label: "Flagged candidates", value: data.flaggedCandidates.length, hint: "Candidates currently hidden from search." },
              { label: "Recent audit events", value: data.requestLogs.length, hint: "Privacy-sensitive actions are logged." },
              { label: "Notifications sent", value: data.notifications, hint: "In-app alerts issued across the platform." }
            ]}
          />
          <Card id="approval">
            <h2 className="text-xl font-semibold">Employer approval queue</h2>
            <div className="mt-5 space-y-4">
              {data.pendingEmployers.map((employer) => (
                <div key={employer.id} className="rounded-2xl border border-slate-100 p-4 text-sm text-slate-600">
                  <p className="font-medium text-slate-900">{employer.company.name}</p>
                  <p>{employer.fullName}</p>
                  <p>{employer.workEmail}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card id="logs">
            <h2 className="text-xl font-semibold">Request logs & analytics</h2>
            <div className="mt-5 space-y-4">
              {data.requestLogs.map((log) => (
                <div key={log.id} className="rounded-2xl border border-slate-100 p-4 text-sm text-slate-600">
                  <p className="font-medium text-slate-900">{log.action}</p>
                  <p>{log.entity}</p>
                </div>
              ))}
            </div>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h2 className="text-xl font-semibold">Candidate moderation</h2>
              <p className="mt-3 text-sm text-muted">Placeholder for manual review actions, account suspensions, and profile quality checks.</p>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold">Platform settings</h2>
              <p className="mt-3 text-sm text-muted">Placeholder for contact disclosure defaults, request expiry, rate limits, and feature flags.</p>
            </Card>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
