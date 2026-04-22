import "server-only";
import type React from "react";
import CandidateRequestEmail from "@/emails/candidate-request-email";
import EmployerApprovedEmail from "@/emails/employer-approved-email";
import EmployerRejectedEmail from "@/emails/employer-rejected-email";
import WelcomeCandidateEmail from "@/emails/welcome-candidate-email";
import WelcomeEmployerEmail from "@/emails/welcome-employer-email";
import { emailConfig, isEmailConfigured, resend } from "@/lib/resend";

type EmailSendParams = {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  tag: string;
};

function makeAppUrl(path: string) {
  const baseUrl = emailConfig.appUrl ?? "http://localhost:3000";
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function logEmailFailure(tag: string, details: unknown) {
  console.error(`[email:${tag}] delivery failed`, details);
}

async function sendEmail({ to, subject, react, tag }: EmailSendParams) {
  if (!isEmailConfigured() || !resend || !emailConfig.from) {
    console.warn(`[email:${tag}] skipped because Resend is not fully configured.`);
    return { ok: false, skipped: true } as const;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to,
      subject,
      react
    });

    if (error) {
      logEmailFailure(tag, error);
      return { ok: false, skipped: false, error } as const;
    }

    return { ok: true, skipped: false, data } as const;
  } catch (error) {
    logEmailFailure(tag, error);
    return { ok: false, skipped: false, error } as const;
  }
}

export async function sendCandidateRequestEmail(params: {
  to: string;
  companyName: string;
  jobTitle: string;
  reason: string;
}) {
  return sendEmail({
    to: params.to,
    subject: "New employer request on AnonHire",
    tag: "candidate-request",
    react: CandidateRequestEmail({
      companyName: params.companyName,
      jobTitle: params.jobTitle,
      reason: params.reason,
      dashboardUrl: makeAppUrl("/candidate/requests")
    })
  });
}

export async function sendEmployerApprovedEmail(params: {
  to: string;
  anonymousId: string;
  jobTitle: string;
  nextStep: string;
}) {
  return sendEmail({
    to: params.to,
    subject: "Your request was approved",
    tag: "employer-approved",
    react: EmployerApprovedEmail({
      anonymousId: params.anonymousId,
      jobTitle: params.jobTitle,
      nextStep: params.nextStep,
      dashboardUrl: makeAppUrl("/employer/dashboard#requests")
    })
  });
}

export async function sendEmployerRejectedEmail(params: {
  to: string;
  anonymousId: string;
  jobTitle: string;
}) {
  return sendEmail({
    to: params.to,
    subject: "Your request was declined",
    tag: "employer-rejected",
    react: EmployerRejectedEmail({
      anonymousId: params.anonymousId,
      jobTitle: params.jobTitle,
      dashboardUrl: makeAppUrl("/employer/search")
    })
  });
}

export async function sendCandidateWelcomeEmail(params: { to: string }) {
  return sendEmail({
    to: params.to,
    subject: "Welcome to AnonHire",
    tag: "welcome-candidate",
    react: WelcomeCandidateEmail({
      dashboardUrl: makeAppUrl("/candidate/dashboard")
    })
  });
}

export async function sendEmployerWelcomeEmail(params: { to: string }) {
  return sendEmail({
    to: params.to,
    subject: "Welcome to AnonHire",
    tag: "welcome-employer",
    react: WelcomeEmployerEmail({
      dashboardUrl: makeAppUrl("/employer/dashboard")
    })
  });
}
