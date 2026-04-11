import { EmployerVerificationStatus, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { employerSignupSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const payload = employerSignupSchema.parse({ ...body, role: "employer" });
  const passwordHash = await bcrypt.hash(payload.password, 10);
  const domain = payload.workEmail.split("@")[1] ?? payload.companyName.toLowerCase().replace(/\s+/g, "-");

  const company = await prisma.company.upsert({
    where: { domain },
    update: { name: payload.companyName, website: payload.website || undefined },
    create: { name: payload.companyName, website: payload.website || undefined, domain }
  });

  const user = await prisma.user.create({
    data: {
      email: payload.workEmail,
      passwordHash,
      role: UserRole.EMPLOYER,
      employerProfile: {
        create: {
          fullName: payload.name,
          designation: payload.designation,
          workEmail: payload.workEmail,
          website: payload.website || undefined,
          verificationStatus: EmployerVerificationStatus.PENDING,
          companyId: company.id
        }
      }
    }
  });

  return NextResponse.json({ userId: user.id });
}
