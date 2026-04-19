import { AuthShell } from "@/components/auth/auth-shell";
import { EmployerAuthForm } from "@/components/auth/employer-auth-form";

export default function EmployerSignupPage() {
  return (
    <AuthShell
      badge="Employer onboarding"
      title="Start hiring smarter"
      description="Connect with verified anonymous professionals in a higher-trust talent marketplace."
      sideTitle="Built for high-trust recruiting."
      sideDescription="Set up your company profile, complete verification, and start reaching out to anonymous candidates in a way that feels credible and respectful."
      points={[
        "Verified employers only",
        "Anonymous candidate profiles",
        "Candidate-approved contact"
      ]}
      trustMessage="Trusted by teams that want faster hiring and better candidate confidence."
      previewLabel="Employer-ready candidate preview"
    >
      <EmployerAuthForm mode="signup" />
    </AuthShell>
  );
}
