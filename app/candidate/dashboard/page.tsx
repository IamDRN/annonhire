import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { EmptyStatePrompt } from "@/components/candidate/empty-state-prompt";
import { ProfileCompletenessCard } from "@/components/candidate/profile-completeness-card";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { PrivacySettingsPanel } from "@/components/candidate/privacy-settings-panel";
import { EmptyState } from "@/components/ui/empty-state";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { Card } from "@/components/ui/card";
import { getCurrentSession } from "@/lib/auth/session";
import { calculateProfileCompleteness } from "@/lib/profile-completeness";
import { getCandidateDashboard } from "@/services/dashboard-service";

export default async function CandidateDashboardPage() {
  const session = await getCurrentSession();
  if (!session?.user) {
    return null;
  }

  const profile = await getCandidateDashboard(session.user.id);
  if (profile && !profile.onboardingCompleted) {
    redirect("/candidate/onboarding");
  }

  const completeness = profile ? calculateProfileCompleteness(profile) : null;
  const emptyPrompts = profile
    ? [
        profile.skills.length === 0
          ? {
              title: "Add your top skills",
              description: "Add your top skills so employers can find you more easily in search.",
              href: "/candidate/onboarding?step=2#editor",
              cta: "Update skills"
            }
          : null,
        profile.workExperience.length === 0
          ? {
              title: "Add your experience",
              description: "Add your experience to help employers evaluate your fit and seniority.",
              href: "/candidate/onboarding?step=2#editor",
              cta: "Add experience"
            }
          : null,
        typeof profile.salaryExpectationMin !== "number" || typeof profile.salaryExpectationMax !== "number"
          ? {
              title: "Set your salary range",
              description: "A salary expectation helps employers understand alignment before they reach out.",
              href: "/candidate/onboarding?step=2#editor",
              cta: "Set salary"
            }
          : null,
        !(profile.privacySetting?.searchable ?? true)
          ? {
              title: "Your profile is currently hidden",
              description: "Turn search visibility back on when you're ready to appear in employer search results.",
              href: "/candidate/onboarding?step=3#privacy",
              cta: "Review visibility"
            }
          : null
      ].filter(Boolean) as Array<{ title: string; description: string; href: string; cta: string }>
    : [];
  const improvementMessages = completeness?.suggestedNextActions.length
    ? completeness.suggestedNextActions.map((item) => item.description)
    : ["Keep your summary, preferences, and privacy settings fresh as your goals evolve."];

  return (
    <ProtectedRoute allow={["CANDIDATE"]}>
      <main className="container-width grid gap-6 py-10 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar role="candidate" />
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Candidate dashboard</h1>
              <p className="mt-2 text-sm text-muted">Manage your anonymous profile, review employer requests, and control what employers can see.</p>
              {completeness && completeness.score < 80 ? (
                <div className="mt-4 inline-flex rounded-2xl border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-900 dark:border-sky-900/40 dark:bg-sky-950/30 dark:text-sky-100">
                  Complete your profile to improve visibility.
                </div>
              ) : null}
            </div>
            <NotificationBell />
          </div>
          <StatsCards
            items={[
              { label: "Profile completeness", value: `${profile?.profileCompleteness ?? 0}%`, hint: "Complete fields improve discoverability." },
              { label: "Employer requests", value: profile?.receivedRequests.length ?? 0, hint: "Review and respond on your terms." },
              { label: "Search visibility", value: profile?.privacySetting?.searchable ?? true ? "On" : "Off", hint: "Toggle discoverability any time." },
              { label: "Blocked domains", value: profile?.blockedEmployers.length ?? 0, hint: "Prevent targeted companies from viewing." }
            ]}
          />
          {completeness ? <ProfileCompletenessCard result={completeness} /> : null}
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <h2 className="text-xl font-semibold">Quick actions</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <a href="#privacy" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white">
                  Review privacy settings
                </a>
                <a href="/candidate/onboarding" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white">
                  Continue profile setup
                </a>
                <a href="/candidate/dashboard" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white">
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
                {improvementMessages.map((message) => (
                  <div key={message} className="rounded-2xl border border-slate-200 p-4">
                    {message}
                  </div>
                ))}
              </div>
            </Card>
          </div>
          {profile ? (
            emptyPrompts.length ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {emptyPrompts.map((prompt) => (
                  <EmptyStatePrompt key={prompt.title} {...prompt} />
                ))}
              </div>
            ) : null
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
              submitLabel="Save privacy settings"
            />
          ) : null}
        </div>
      </main>
    </ProtectedRoute>
  );
}
