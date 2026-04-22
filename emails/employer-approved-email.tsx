import * as React from "react";
import { DetailRow, EmailShell } from "@/emails/email-shell";

export function EmployerApprovedEmail({
  anonymousId,
  jobTitle,
  nextStep,
  dashboardUrl
}: {
  anonymousId: string;
  jobTitle: string;
  nextStep: string;
  dashboardUrl: string;
}) {
  return (
    <EmailShell
      preview="A candidate approved your AnonHire request."
      title="Your request was approved"
      eyebrow="Request approved"
      intro="Good news. A candidate has approved your request, so you can continue the conversation from your employer dashboard."
      ctaLabel="Open employer dashboard"
      ctaHref={dashboardUrl}
      footer="AnonHire keeps the process respectful by letting candidates control when identity and contact details are shared."
    >
      <DetailRow label="Candidate" value={anonymousId} />
      <DetailRow label="Role" value={jobTitle} />
      <DetailRow label="Next step" value={nextStep} />
    </EmailShell>
  );
}

export default EmployerApprovedEmail;
