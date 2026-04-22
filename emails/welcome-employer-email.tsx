import * as React from "react";
import { DetailRow, EmailShell } from "@/emails/email-shell";

export function WelcomeEmployerEmail({
  dashboardUrl
}: {
  dashboardUrl: string;
}) {
  return (
    <EmailShell
      preview="Welcome to AnonHire employer access."
      title="Welcome to AnonHire"
      eyebrow="Employer account"
      intro="Thanks for joining AnonHire. This workspace is designed to help you discover anonymous talent while preserving candidate trust."
      ctaLabel="Open employer dashboard"
      ctaHref={dashboardUrl}
      footer="Search and outreach unlock fully once your employer profile is verified."
    >
      <DetailRow label="Step 1" value="Complete your company profile and verification details." />
      <DetailRow label="Step 2" value="Search privacy-safe candidate profiles by skill and fit." />
      <DetailRow label="Step 3" value="Send structured requests and wait for candidate approval." />
    </EmailShell>
  );
}

export default WelcomeEmployerEmail;
