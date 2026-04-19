import { CandidateAuthForm } from "@/components/auth/candidate-auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { googleAuthEnabled } from "@/lib/auth/auth";

export default function CandidateLoginPage() {
  return (
    <AuthShell
      badge="Candidate access"
      title="Welcome back"
      description="Stay private. Get discovered by the right employers."
      sideTitle="Stay anonymous. Get discovered."
      sideDescription="Your identity stays hidden until you choose to connect. AnonHire helps professionals explore new roles with privacy, control, and confidence."
      points={[
        "Anonymous profile",
        "Verified employers",
        "You control contact visibility"
      ]}
      trustMessage="Trusted by professionals exploring opportunities privately."
      previewLabel="Private candidate preview"
    >
      <CandidateAuthForm mode="login" googleEnabled={googleAuthEnabled} />
    </AuthShell>
  );
}
