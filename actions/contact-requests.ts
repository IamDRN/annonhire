"use server";

import { ContactRequestStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { getContactDisclosureMode } from "@/lib/utils";
import { contactRequestSchema } from "@/lib/validations";
import { logAuditEvent } from "@/services/audit-service";
import {
  sendCandidateRequestEmail,
  sendEmployerApprovedEmail,
  sendEmployerRejectedEmail
} from "@/services/email-service";
import { createNotification } from "@/services/notification-service";

export async function createContactRequest(employerProfileId: string, values: unknown) {
  const payload = contactRequestSchema.parse(values);
  const [candidate, employer] = await Promise.all([
    prisma.candidateProfile.findUnique({
      where: { id: payload.candidateProfileId },
      include: {
        user: true,
        privacySetting: true
      }
    }),
    prisma.employerProfile.findUnique({
      where: { id: employerProfileId },
      include: {
        user: true,
        company: true
      }
    })
  ]);

  if (!candidate || !employer) {
    throw new Error("Candidate not found");
  }

  const request = await prisma.contactRequest.create({
    data: {
      candidateProfileId: payload.candidateProfileId,
      employerProfileId,
      jobTitle: payload.jobTitle,
      message: payload.message,
      reason: payload.reason,
      revealContactOnAccept:
        getContactDisclosureMode() === "reveal_contact" && !candidate.privacySetting?.allowMessagingOnly
    }
  });

  await createNotification(
    candidate.userId,
    "New contact request",
    "A verified employer wants to connect about an opportunity.",
    "contact_request"
  );

  await sendCandidateRequestEmail({
    to: candidate.user.email,
    companyName: employer.company.name,
    jobTitle: payload.jobTitle,
    reason: payload.reason
  });

  await logAuditEvent({
    action: "CONTACT_REQUEST_CREATED",
    actorId: employer.userId,
    entity: "ContactRequest",
    entityId: request.id,
    metadata: { employerProfileId }
  });

  revalidatePath("/candidate/dashboard");
  revalidatePath("/employer/dashboard");
}

export async function updateContactRequestStatus(requestId: string, status: ContactRequestStatus) {
  const request = await prisma.contactRequest.update({
    where: { id: requestId },
    data: { status },
    include: {
      candidateProfile: { include: { user: true, privacySetting: true } },
      employerProfile: { include: { user: true, company: true } }
    }
  });

  await createNotification(
    request.employerProfile.userId,
    "Request updated",
    `Candidate responded to your request: ${status.toLowerCase().replaceAll("_", " ")}.`,
    status === ContactRequestStatus.ACCEPTED ? "request_approved" : status === ContactRequestStatus.REJECTED ? "request_rejected" : "request_update"
  );

  if (status === ContactRequestStatus.ACCEPTED) {
    const deliveryMode =
      request.revealContactOnAccept && !request.candidateProfile.privacySetting?.allowMessagingOnly
        ? "Contact details unlocked for employer."
        : "Secure messaging channel enabled for follow-up.";

    await createNotification(request.candidateProfile.userId, "Connection ready", deliveryMode, "connection_ready");

    await sendEmployerApprovedEmail({
      to: request.employerProfile.user.email,
      anonymousId: request.candidateProfile.anonymousId,
      jobTitle: request.jobTitle,
      nextStep: deliveryMode
    });
  }

  if (status === ContactRequestStatus.REJECTED) {
    await sendEmployerRejectedEmail({
      to: request.employerProfile.user.email,
      anonymousId: request.candidateProfile.anonymousId,
      jobTitle: request.jobTitle
    });
  }

  await logAuditEvent({
    actorId: request.candidateProfile.userId,
    action: "CONTACT_REQUEST_STATUS_UPDATED",
    entity: "ContactRequest",
    entityId: request.id,
    metadata: { status }
  });

  revalidatePath("/candidate/dashboard");
  revalidatePath("/employer/dashboard");
}
