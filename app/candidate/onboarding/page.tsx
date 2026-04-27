import { redirect } from "next/navigation";
import { CandidateOnboardingFlow } from "@/components/candidate/candidate-onboarding-flow";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { EmptyState } from "@/components/ui/empty-state";
import { getCurrentSession } from "@/lib/auth/session";
import { getCandidateDashboard } from "@/services/dashboard-service";

export default async function CandidateOnboardingPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getCurrentSession();
  if (!session?.user) {
    return null;
  }

  const profile = await getCandidateDashboard(session.user.id);
  if (!profile) {
    return (
      <ProtectedRoute allow={["CANDIDATE"]}>
        <main className="container-width py-10">
          <EmptyState title="No profile found" description="Create a candidate account to begin building your anonymous profile." />
        </main>
      </ProtectedRoute>
    );
  }

  if (profile.onboardingCompleted) {
    redirect("/candidate/dashboard");
  }

  const params = await searchParams;
  const requestedStep = typeof params.step === "string" ? Number(params.step) : undefined;

  return (
    <ProtectedRoute allow={["CANDIDATE"]}>
      <CandidateOnboardingFlow
        candidateProfileId={profile.id}
        initialStep={requestedStep && requestedStep > 0 ? requestedStep : profile.onboardingStep}
        initialValues={{
          fullName: profile.fullName ?? "",
          headline: profile.headline ?? "",
          skills: profile.skills.map((skill) => skill.name),
          yearsOfExperience: profile.yearsOfExperience ?? 0,
          showEmail: profile.privacySetting?.showEmail ?? false,
          showPhone: profile.privacySetting?.showPhone ?? false,
          resumeFileName: profile.resume?.fileName ?? "",
          resumeFileUrl: profile.resume?.fileUrl ?? ""
        }}
      />
    </ProtectedRoute>
  );
}
