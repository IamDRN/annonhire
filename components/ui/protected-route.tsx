import * as React from "react";
import type { AppUserRole } from "@/lib/auth/auth";
import { requireRole } from "@/lib/auth/session";

export async function ProtectedRoute({
  allow,
  children
}: {
  allow: AppUserRole[];
  children: React.ReactNode;
}) {
  await requireRole(allow);
  return <>{children}</>;
}
