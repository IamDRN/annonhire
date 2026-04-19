import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { NotificationBell } from "@/components/dashboard/notification-bell";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { OnboardingWorkspace } from "@/components/candidate/onboarding-workspace";
import { PrivacySettingsPanel } from "@/components/candidate/privacy-settings-panel";
import { EmptyState } from "@/components/ui/empty-state";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Card } from "@/components/ui/card";
import { getCurrentSession } from "@/lib/auth/session";
import { getCandidateDashboard, getNotificationsForUser } from "@/services/dashboard-service";

export default async function CandidateDashboardPage() {
  const session = await getCurrentSession();
  if (!session?.user) {
    return null;
  }

  const [profile, notifications] = await Promise.all([
    getCandidateDashboard(session.user.id),
    getNotificationsForUser(session.user.id)
  ]);

  const parsedDraft = {
    fullName: "Anonymous Candidate",
    headline: profile?.headline ?? "",
    summary: profile?.summary ?? "",
    skills: profile?.skills.map((skill) => skill.name) ?? [],
    workExperience:
      profile?.workExperience.map((item) => ({
        title: item.title,
        companyName: item.companyName,
        industry: item.industry ?? "",
        description: item.description ?? ""
      })) ?? [],
    education:
      profile?.education.map((item) => ({
        institution: item.institution,
        degree: item.degree,
        fieldOfStudy: item.fieldOfStudy ?? "",
        graduationYear: item.graduationYear ?? undefined
      })) ?? [],
    certifications:
      profile?.certifications.map((item) => ({
        name: item.name,
        issuer: item.issuer ?? "",
        year: item.year ?? undefined
      })) ?? [],
    yearsOfExperience: profile?.yearsOfExperience ?? 0,
    preferredLocation: profile?.preferredLocation ?? "Remote",
    salaryExpectation: {
      min: profile?.salaryExpectationMin ?? 0,
      max: profile?.salaryExpectationMax ?? 0
    },
    noticePeriod: profile?.noticePeriod ?? "NEGOTIABLE",
    workMode: profile?.workMode ?? "FLEXIBLE"
  };

  return (
    <ProtectedRoute allow={["CANDIDATE"]}>
      <main className="container-width grid gap-6 py-10 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar role="candidate" />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Candidate dashboard</h1>
            <p className="mt-2 text-sm text-muted">Manage your anonymous profile, review employer requests, and control what employers can see.</p>
          </div>
          <StatsCards
            items={[
              { label: "Profile completeness", value: `${profile?.profileCompleteness ?? 0}%`, hint: "Complete fields improve discoverability." },
              { label: "Employer requests", value: profile?.receivedRequests.length ?? 0, hint: "Review and respond on your terms." },
              { label: "Search visibility", value: profile?.searchVisibility ? "On" : "Off", hint: "Toggle discoverability any time." },
              { label: "Blocked domains", value: profile?.blockedEmployers.length ?? 0, hint: "Prevent targeted companies from viewing." }
            ]}
          />
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <h2 className="text-xl font-semibold">Quick actions</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <a href="#privacy" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white">
                  Review privacy settings
                </a>
                <a href="#notifications" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white">
                  Check recent notifications
                </a>
                <a href="/candidate/requests" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white">
                  Open employer requests
                </a>
                <a href="/candidate/profile/demo" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white">
                  Preview anonymous profile
                </a>
              </div>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold">Improve discoverability</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 p-4">Add skill coverage that matches your target roles.</div>
                <div className="rounded-2xl border border-slate-200 p-4">Complete work experience and salary range to raise profile quality.</div>
                <div className="rounded-2xl border border-slate-200 p-4">Review privacy settings before turning search visibility on.</div>
              </div>
            </Card>
          </div>
          {profile ? (
            <OnboardingWorkspace candidateProfileId={profile.id} initialDraft={parsedDraft} />
          ) : (
            <EmptyState title="No profile found" description="Create a candidate account to begin building your anonymous profile." />
          )}
          {profile ? (
            <PrivacySettingsPanel
              candidateProfileId={profile.id}
              initial={{
                searchable: profile.privacySetting?.searchable ?? true,
                showExactCity: profile.privacySetting?.showExactCity ?? false,
                companyMode: profile.privacySetting?.companyMode ?? "MASKED",
                revealEducationInstitution: profile.privacySetting?.revealEducationInstitution ?? false,
                revealGraduationYear: profile.privacySetting?.revealGraduationYear ?? false,
                allowMessagingOnly: profile.privacySetting?.allowMessagingOnly ?? true,
                blockedDomains: profile.blockedEmployers.map((item) => item.employerDomain)
              }}
            />
          ) : null}
          <NotificationBell notifications={notifications} />
        </div>
      </main>
    </ProtectedRoute>
  );
}
