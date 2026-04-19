import { AuthShell } from "@/components/auth/auth-shell";
import { EmployerAuthForm } from "@/components/auth/employer-auth-form";

export default function EmployerLoginPage() {
  return (
    <AuthShell
      badge="Employer portal"
      title="Find top talent faster"
      description="Access high-quality anonymous candidates through a trusted employer workspace."
      sideTitle="Privacy-first hiring that still moves fast."
      sideDescription="AnonHire gives your team a cleaner way to review verified anonymous talent, send respectful outreach, and build trust before identity is revealed."
      points={[
        "Verified employers only",
        "Anonymous candidate profiles",
        "Candidate-approved contact"
      ]}
      trustMessage="Built for employers who want quality outreach without compromising candidate trust."
      previewLabel="Anonymous talent preview"
    >
      <EmployerAuthForm mode="login" />
    </AuthShell>
  );
}
