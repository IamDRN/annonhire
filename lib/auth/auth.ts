import bcrypt from "bcryptjs";
import NextAuth, { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/db/prisma";
import { normalizeRole } from "@/lib/auth/roles";

export type AppUserRole = "CANDIDATE" | "EMPLOYER" | "ADMIN";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: AppUserRole;
    };
  }

  interface User {
    id: string;
    role: AppUserRole;
  }
}

function createAnonymousId() {
  return `AH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export const googleAuthEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

const providers: NextAuthConfig["providers"] = [
  ...(googleAuthEnabled
    ? [
        GoogleProvider({
          clientId: process.env.AUTH_GOOGLE_ID!,
          clientSecret: process.env.AUTH_GOOGLE_SECRET!,
          allowDangerousEmailAccountLinking: true
        })
      ]
    : []),
  CredentialsProvider({
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      const email = typeof credentials?.email === "string" ? credentials.email.toLowerCase() : null;
      const password = typeof credentials?.password === "string" ? credentials.password : null;

      if (!email || !password) return null;

      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user?.passwordHash) return null;

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) return null;

      return {
        id: user.id,
        email: user.email ?? undefined,
        name: user.name ?? undefined,
        image: user.image ?? undefined,
        role: normalizeRole(user.role) as AppUserRole
      };
    }
  })
];

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/candidate/login"
  },
  providers,
      callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google" && user.email) {
          const email = user.email.toLowerCase();

          const dbUser = await prisma.user.upsert({
            where: { email },
            update: {
              name: user.name ?? undefined,
              image: user.image ?? undefined
            },
            create: {
              email,
              name: user.name ?? null,
              image: user.image ?? null,
              role: "CANDIDATE"
            }
          });

          try {
            if (dbUser.role === "CANDIDATE") {
              const existingProfile = await prisma.candidateProfile.findUnique({
                where: { userId: dbUser.id }
              });

              if (!existingProfile) {
                await prisma.candidateProfile.create({
                  data: {
                    userId: dbUser.id,
                    anonymousId: createAnonymousId(),
                    profileCompleteness: 0,
                    onboardingCompleted: false,
                    onboardingStep: 1
                  }
                });
              }
            }
          } catch (profileError) {
            console.error("Candidate profile creation failed:", profileError);
          }
        }

        return true;
      } catch (error) {
        console.error("Google signIn callback failed:", error);
        return false;
      }
    },

async jwt({ token, user }) {
  const mutableToken = token as typeof token & {
    id?: string;
    role?: AppUserRole;
  };

  if (user) {
    mutableToken.id = user.id;
    mutableToken.role = normalizeRole(user.role) as AppUserRole;
  }

  if (token.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: token.email.toLowerCase() }
    });

    if (dbUser) {
      mutableToken.id = dbUser.id;
      mutableToken.role = normalizeRole(dbUser.role) as AppUserRole;
      mutableToken.name = dbUser.name ?? token.name;
      mutableToken.picture = dbUser.image ?? token.picture;
    }
  }

  return mutableToken;
},

   async session({ session, token }) {
  const typedToken = token as typeof token & {
    id?: string;
    role?: AppUserRole;
  };

  if (session.user) {
    session.user.id = String(typedToken.id ?? "");
    session.user.role = normalizeRole(
      String(typedToken.role ?? "CANDIDATE")
    ) as AppUserRole;
    session.user.email = session.user.email ?? undefined;
  }

  return session;
},
    async redirect({ baseUrl, url }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    }
  }
};
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
