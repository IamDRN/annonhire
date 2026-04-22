import { redirect } from "next/navigation";
import type { AppUserRole } from "@/lib/auth/auth";
import { auth } from "@/lib/auth/auth";

export async function getCurrentSession() {
  return auth();
}

export async function requireRole(roles: AppUserRole[]) {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/candidate/login");
  }

  if (!roles.includes(session.user.role)) {
    redirect("/");
  }

  return session;
}
