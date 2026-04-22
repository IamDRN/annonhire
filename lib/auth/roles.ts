export type RoleLike = "CANDIDATE" | "EMPLOYER" | "ADMIN" | "candidate" | "employer" | "admin";

export function normalizeRole(role?: string | null): "CANDIDATE" | "EMPLOYER" | "ADMIN" {
  if (!role) return "CANDIDATE";

  const normalized = role.toUpperCase();
  if (normalized === "EMPLOYER") return "EMPLOYER";
  if (normalized === "ADMIN") return "ADMIN";
  return "CANDIDATE";
}

export function getRoleDashboardPath(role?: string | null) {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === "EMPLOYER") return "/employer/dashboard";
  if (normalizedRole === "ADMIN") return "/admin/dashboard";
  return "/candidate/dashboard";
}
