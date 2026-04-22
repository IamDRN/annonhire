import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getRoleDashboardPath, normalizeRole } from "@/lib/auth/roles";

const candidateProtected = ["/candidate/dashboard", "/candidate/requests", "/candidate/onboarding"];
const employerProtected = ["/employer/dashboard", "/employer/search"];
const adminProtected = ["/admin"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected =
    candidateProtected.some((route) => pathname.startsWith(route)) ||
    employerProtected.some((route) => pathname.startsWith(route)) ||
    adminProtected.some((route) => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
  });

  if (!token) {
    const loginUrl = new URL("/candidate/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = normalizeRole(String(token.role ?? "CANDIDATE"));

  if (candidateProtected.some((route) => pathname.startsWith(route)) && role !== "CANDIDATE") {
    return NextResponse.redirect(new URL(getRoleDashboardPath(role), request.url));
  }

  if (employerProtected.some((route) => pathname.startsWith(route)) && role !== "EMPLOYER") {
    return NextResponse.redirect(new URL(getRoleDashboardPath(role), request.url));
  }

  if (adminProtected.some((route) => pathname.startsWith(route)) && role !== "ADMIN") {
    return NextResponse.redirect(new URL(getRoleDashboardPath(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/candidate/:path*", "/employer/:path*", "/admin/:path*"]
};
