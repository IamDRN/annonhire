import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { AppUserRole } from "@/lib/auth/auth";
import { authOptions } from "@/lib/auth/auth";

export async function getCurrentSession() {
  return getServerSession(authOptions);
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
