import * as React from "react";
import { DetailRow, EmailShell } from "@/emails/email-shell";

export function EmployerRejectedEmail({
  anonymousId,
  jobTitle,
  dashboardUrl
}: {
  anonymousId: string;
  jobTitle: string;
  dashboardUrl: string;
}) {
  return (
    <EmailShell
      preview="A candidate declined your AnonHire request."
      title="Your request was declined"
      eyebrow="Request update"
      intro="The candidate chose not to move forward with this request. You can continue reviewing other privacy-safe profiles from your dashboard."
      ctaLabel="Browse candidates"
      ctaHref={dashboardUrl}
      footer="Thoughtful, consent-based outreach helps maintain trust on both sides of the marketplace."
    >
      <DetailRow label="Candidate" value={anonymousId} />
      <DetailRow label="Role" value={jobTitle} />
    </EmailShell>
  );
}

export default EmployerRejectedEmail;
