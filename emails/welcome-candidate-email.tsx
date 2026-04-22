import * as React from "react";
import { DetailRow, EmailShell } from "@/emails/email-shell";

export function WelcomeCandidateEmail({
  dashboardUrl
}: {
  dashboardUrl: string;
}) {
  return (
    <EmailShell
      preview="Welcome to AnonHire."
      title="Welcome to AnonHire"
      eyebrow="Candidate account"
      intro="You’re in. AnonHire helps you explore new opportunities without exposing your identity too early."
      ctaLabel="Complete your profile"
      ctaHref={dashboardUrl}
      footer="Your personal details remain hidden by default until you approve employer contact."
    >
      <DetailRow label="Step 1" value="Upload your resume and review the parsed profile." />
      <DetailRow label="Step 2" value="Adjust privacy controls before becoming searchable." />
      <DetailRow label="Step 3" value="Review employer requests and decide when to connect." />
    </EmailShell>
  );
}

export default WelcomeCandidateEmail;
