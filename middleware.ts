import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/candidate/login",
  },
});

export const config = {
  matcher: [
    "/candidate/dashboard/:path*",
    "/candidate/profile/:path*",
    "/candidate/settings/:path*",
    "/employer/dashboard/:path*",
    "/employer/search/:path*",
    "/employer/requests/:path*",
    "/admin/:path*",
  ],
};