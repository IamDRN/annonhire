import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { authOptions } from "@/lib/auth/auth";

export async function getCurrentSession() {
  return getServerSession(authOptions);
}

export async function requireRole(roles: UserRole[]) {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/candidate/login");
  }

  if (!roles.includes(session.user.role)) {
    redirect("/");
  }

  return session;
}
