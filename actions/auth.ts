"use server";

import bcrypt from "bcryptjs";
import { EmployerVerificationStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { candidateSignupSchema, employerSignupSchema } from "@/lib/validations";

export async function registerCandidate(input: FormData) {
  const payload = candidateSignupSchema.parse({
    email: input.get("email"),
    password: input.get("password"),
    role: "candidate"
  });

  const passwordHash = await bcrypt.hash(payload.password, 10);

  return prisma.user.create({
    data: {
      email: payload.email,
      passwordHash,
      role: "CANDIDATE",
      candidateProfile: {
        create: {
          anonymousId: `ANON-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
          profileCompleteness: 12
        }
      }
    }
  });
}

export async function registerEmployer(input: FormData) {
  const payload = employerSignupSchema.parse({
    name: input.get("name"),
    workEmail: input.get("workEmail"),
    password: input.get("password"),
    companyName: input.get("companyName"),
    website: input.get("website") || "",
    designation: input.get("designation"),
    role: "employer"
  });

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const domain = payload.workEmail.split("@")[1] ?? payload.companyName.toLowerCase().replace(/\s+/g, "-");
  const company = await prisma.company.upsert({
    where: { domain },
    update: {
      name: payload.companyName,
      website: payload.website || undefined
    },
    create: {
      name: payload.companyName,
      website: payload.website || undefined,
      domain
    }
  });

  return prisma.user.create({
    data: {
      email: payload.workEmail,
      passwordHash,
      role: "EMPLOYER",
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
}
