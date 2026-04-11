import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { candidateSignupSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const payload = candidateSignupSchema.parse({ ...body, role: "candidate" });
  const passwordHash = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      email: payload.email,
      passwordHash,
      role: UserRole.CANDIDATE,
      candidateProfile: {
        create: {
          anonymousId: `ANON-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
          profileCompleteness: 12
        }
      }
    }
  });

  return NextResponse.json({ userId: user.id });
}
