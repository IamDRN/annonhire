import "server-only";
import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const emailConfig = {
  apiKeyConfigured: Boolean(process.env.RESEND_API_KEY),
  from: process.env.EMAIL_FROM,
  appUrl: process.env.APP_URL?.replace(/\/$/, "")
};

export function isEmailConfigured() {
  return Boolean(emailConfig.apiKeyConfigured && emailConfig.from && emailConfig.appUrl);
}
