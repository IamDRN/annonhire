import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { candidateSignupSchema } from "@/lib/validations";
import { sendCandidateWelcomeEmail } from "@/services/email-service";
import { createNotification } from "@/services/notification-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = candidateSignupSchema.parse({ ...body, role: "candidate" });
    const email = payload.email.toLowerCase();
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new NextResponse("An account already exists for this email.", { status: 409 });
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "CANDIDATE",
        candidateProfile: {
          create: {
            anonymousId: `AH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
            profileCompleteness: 0,
            onboardingCompleted: false,
            onboardingStep: 1
          }
        }
      }
    });

    await createNotification(
      user.id,
      "Welcome to AnonHire",
      "Complete your anonymous profile, review privacy settings, and start exploring opportunities safely.",
      "welcome"
    );

    await sendCandidateWelcomeEmail({ to: email });

    return NextResponse.json({ userId: user.id });
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Unable to create candidate account.", {
      status: 400
    });
  }
}
