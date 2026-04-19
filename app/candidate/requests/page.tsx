import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { RequestStatusBadge } from "@/components/employer/request-status-badge";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateContactRequestStatus } from "@/actions/contact-requests";
import { getCurrentSession } from "@/lib/auth/session";
import { getCandidateDashboard } from "@/services/dashboard-service";

export default async function CandidateRequestsPage() {
  const session = await getCurrentSession();
  if (!session?.user) {
    return null;
  }

  const profile = await getCandidateDashboard(session.user.id);

  return (
    <ProtectedRoute allow={["CANDIDATE"]}>
      <main className="container-width grid gap-6 py-10 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar role="candidate" />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Employer requests</h1>
            <p className="mt-2 text-sm text-muted">Approve, reject, or ask for more information before revealing anything.</p>
          </div>
          {(profile?.receivedRequests ?? []).map((request) => (
            <Card key={request.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted">{request.employerProfile.company.name}</p>
                  <h3 className="mt-1 text-xl font-semibold">{request.jobTitle}</h3>
                  <p className="mt-3 text-sm text-muted">{request.message}</p>
                  <p className="mt-2 text-sm text-slate-600">Reason: {request.reason}</p>
                </div>
                <RequestStatusBadge status={request.status} />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <form action={async () => { "use server"; await updateContactRequestStatus(request.id, "ACCEPTED"); }}>
                  <Button type="submit">Accept</Button>
                </form>
                <form action={async () => { "use server"; await updateContactRequestStatus(request.id, "REJECTED"); }}>
                  <Button type="submit" variant="outline">Reject</Button>
                </form>
                <form action={async () => { "use server"; await updateContactRequestStatus(request.id, "NEEDS_MORE_DETAILS"); }}>
                  <Button type="submit" variant="secondary">Ask for more details</Button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
}
