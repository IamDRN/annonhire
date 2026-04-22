import { redirect } from "next/navigation";
import { CandidateOnboardingFlow } from "@/components/candidate/candidate-onboarding-flow";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { EmptyState } from "@/components/ui/empty-state";
import { getCurrentSession } from "@/lib/auth/session";
import { calculateProfileCompleteness } from "@/lib/profile-completeness";
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
  const completeness = calculateProfileCompleteness(profile);

  const parsedDraft = {
    fullName: profile.fullName ?? "Anonymous Candidate",
    headline: profile.headline ?? "",
    summary: profile.summary ?? "",
    skills: profile.skills.map((skill) => skill.name),
    workExperience: profile.workExperience.map((item) => ({
      title: item.title,
      companyName: item.companyName,
      industry: item.industry ?? "",
      description: item.description ?? ""
    })),
    education: profile.education.map((item) => ({
      institution: item.institution,
      degree: item.degree,
      fieldOfStudy: item.fieldOfStudy ?? "",
      graduationYear: item.graduationYear ?? undefined
    })),
    certifications: profile.certifications.map((item) => ({
      name: item.name,
      issuer: item.issuer ?? "",
      year: item.year ?? undefined
    })),
    yearsOfExperience: profile.yearsOfExperience ?? 0,
    preferredLocation: profile.preferredLocation ?? "",
    salaryExpectation: {
      min: profile.salaryExpectationMin ?? 0,
      max: profile.salaryExpectationMax ?? 0
    },
    noticePeriod: profile.noticePeriod ?? "NEGOTIABLE",
    workMode: profile.workMode ?? "FLEXIBLE"
  };

  return (
    <ProtectedRoute allow={["CANDIDATE"]}>
      <CandidateOnboardingFlow
        candidateProfileId={profile.id}
        initialStep={requestedStep && requestedStep > 0 ? requestedStep : profile.onboardingStep}
        initialDraft={parsedDraft}
        initialPrivacy={{
          searchable: profile.privacySetting?.searchable ?? true,
          showExactCity: profile.privacySetting?.showExactCity ?? false,
          companyMode: profile.privacySetting?.companyMode ?? "MASKED",
          revealEducationInstitution: profile.privacySetting?.revealEducationInstitution ?? false,
          revealGraduationYear: profile.privacySetting?.revealGraduationYear ?? false,
          allowMessagingOnly: profile.privacySetting?.allowMessagingOnly ?? true,
          blockedDomains: profile.blockedEmployers.map((item) => item.employerDomain)
        }}
        completeness={completeness}
      />
    </ProtectedRoute>
  );
}
