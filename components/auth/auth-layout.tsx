import type React from "react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthSidePanel } from "@/components/auth/auth-side-panel";

export function AuthLayout({
  children,
  sidePanel
}: {
  children: React.ReactNode;
  sidePanel: React.ComponentProps<typeof AuthSidePanel>;
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-transparent">
      <div className="relative isolate min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(102,179,223,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.16),transparent_28%)]" />
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-5 py-8 md:px-6 md:py-10 lg:grid-cols-[minmax(0,540px)_1fr] lg:gap-12">
          <div className="order-2 lg:order-1">
            <BrandLogo className="mb-6" imageClassName="h-11 sm:h-12" priority />
            <AuthCard>{children}</AuthCard>
          </div>
          <div className="order-1 lg:order-2">
            <AuthSidePanel {...sidePanel} />
          </div>
        </div>
      </div>
    </main>
  );
}
