import { CandidateAuthForm } from "@/components/auth/candidate-auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { googleAuthEnabled } from "@/lib/auth/auth";

export default function CandidateSignupPage() {
  return (
    <AuthShell
      badge="Candidate onboarding"
      title="Create your anonymous profile"
      description="Explore opportunities without revealing your identity."
      sideTitle="Stay anonymous. Get discovered."
      sideDescription="Your identity stays hidden until you choose to connect. Build a profile once, tune your privacy, and start receiving interest from verified employers."
      points={[
        "Anonymous profile",
        "Verified employers",
        "You control contact visibility"
      ]}
      trustMessage="Trusted by professionals exploring opportunities privately."
      previewLabel="Anonymous profile preview"
    >
      <CandidateAuthForm mode="signup" googleEnabled={googleAuthEnabled} />
    </AuthShell>
  );
}
