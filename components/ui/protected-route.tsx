import * as React from "react";
import { UserRole } from "@prisma/client";
import { requireRole } from "@/lib/auth/session";

export async function ProtectedRoute({
  allow,
  children
}: {
  allow: UserRole[];
  children: React.ReactNode;
}) {
  await requireRole(allow);
  return <>{children}</>;
}
