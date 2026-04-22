// proxy.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const token = req.auth;
  const pathname = nextUrl.pathname;

  const publicRoutes = [
    "/",
    "/candidate/login",
    "/candidate/signup",
    "/employer/login",
    "/employer/signup",
  ];

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = pathname.startsWith("/api/auth");

  if (isPublicRoute || isAuthRoute) {
    return NextResponse.next();
  }

  if (!token?.user) {
    return NextResponse.redirect(new URL("/candidate/login", req.url));
  }

  const role = String(token.user.role ?? "").toUpperCase();

  if (pathname.startsWith("/candidate")) {
    if (role !== "CANDIDATE") {
      return NextResponse.redirect(new URL("/employer/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/employer")) {
    if (role !== "EMPLOYER") {
      return NextResponse.redirect(new URL("/candidate/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/candidate/:path*",
    "/employer/:path*",
    "/admin/:path*",
  ],
};