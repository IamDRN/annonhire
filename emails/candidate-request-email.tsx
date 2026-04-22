import * as React from "react";
import { DetailRow, EmailShell } from "@/emails/email-shell";

export function CandidateRequestEmail({
  companyName,
  jobTitle,
  reason,
  dashboardUrl
}: {
  companyName: string;
  jobTitle: string;
  reason: string;
  dashboardUrl: string;
}) {
  return (
    <EmailShell
      preview="A verified employer wants to connect on AnonHire."
      title="New employer request on AnonHire"
      eyebrow="Contact request"
      intro="A verified employer has sent you a new request. Your identity is still private, and nothing is shared until you decide how to respond."
      ctaLabel="Review request"
      ctaHref={dashboardUrl}
      footer="You can approve, decline, or ask for more details from your dashboard."
    >
      <DetailRow label="Company" value={companyName} />
      <DetailRow label="Role" value={jobTitle} />
      <DetailRow label="Why they reached out" value={reason} />
    </EmailShell>
  );
}

export default CandidateRequestEmail;
