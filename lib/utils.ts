import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyRange(min?: number | null, max?: number | null) {
  if (!min && !max) return "Flexible";
  if (min && max) return `$${Math.round(min / 1000)}k - $${Math.round(max / 1000)}k`;
  if (min) return `From $${Math.round(min / 1000)}k`;
  return `Up to $${Math.round((max ?? 0) / 1000)}k`;
}

export function maskCompanyName(name: string) {
  if (!name) return "Confidential employer";
  return `${name.slice(0, 1)}${"*".repeat(Math.max(3, name.length - 1))}`;
}

export function getContactDisclosureMode() {
  return (process.env.CONTACT_REVEAL_MODE ?? "messaging_only") as "messaging_only" | "reveal_contact";
}
