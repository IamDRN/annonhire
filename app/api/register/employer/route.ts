import { EmployerVerificationStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { employerSignupSchema } from "@/lib/validations";
import { sendEmployerWelcomeEmail } from "@/services/email-service";
import { createNotification } from "@/services/notification-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = employerSignupSchema.parse({ ...body, role: "employer" });
    const email = payload.workEmail.toLowerCase();
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new NextResponse("An employer account already exists for this email.", { status: 409 });
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const domain = email.split("@")[1] ?? payload.companyName.toLowerCase().replace(/\s+/g, "-");

    const company = await prisma.company.upsert({
      where: { domain },
      update: { name: payload.companyName, website: payload.website || undefined },
      create: { name: payload.companyName, website: payload.website || undefined, domain }
    });

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "EMPLOYER",
        employerProfile: {
          create: {
            fullName: payload.name,
            designation: payload.designation,
            workEmail: email,
            website: payload.website || undefined,
            verificationStatus: EmployerVerificationStatus.PENDING,
            companyId: company.id
          }
        }
      }
    });

    await createNotification(
      user.id,
      "Welcome to AnonHire",
      "Complete company verification to unlock the full anonymous candidate search experience.",
      "welcome"
    );

    await sendEmployerWelcomeEmail({ to: email });

    return NextResponse.json({ userId: user.id });
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Unable to create employer account.", {
      status: 400
    });
  }
}
