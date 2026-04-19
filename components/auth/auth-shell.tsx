import type React from "react";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthLayout } from "@/components/auth/auth-layout";

export function AuthShell({
  title,
  description,
  badge,
  children,
  sideTitle,
  sideDescription,
  points,
  trustMessage,
  previewLabel
}: {
  title: string;
  description: string;
  badge: string;
  children: React.ReactNode;
  sideTitle: string;
  sideDescription: string;
  points: string[];
  trustMessage?: string;
  previewLabel?: string;
}) {
  return (
    <AuthLayout
      sidePanel={{
        headline: sideTitle,
        subtext: sideDescription,
        points,
        previewLabel,
        trustMessage: trustMessage ?? "Trusted by professionals exploring opportunities privately."
      }}
    >
      <AuthHeader badge={badge} title={title} description={description} />
      <div className="mt-8">{children}</div>
    </AuthLayout>
  );
}
