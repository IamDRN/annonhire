"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";

export async function toggleSavedCandidate(employerProfileId: string, candidateProfileId: string) {
  const existing = await prisma.savedCandidate.findUnique({
    where: {
      employerProfileId_candidateProfileId: {
        employerProfileId,
        candidateProfileId
      }
    }
  });

  if (existing) {
    await prisma.savedCandidate.delete({
      where: {
        employerProfileId_candidateProfileId: {
          employerProfileId,
          candidateProfileId
        }
      }
    });
  } else {
    await prisma.savedCandidate.create({
      data: {
        employerProfileId,
        candidateProfileId
      }
    });
  }

  revalidatePath("/employer/search");
  revalidatePath("/employer/dashboard");

  return {
    saved: !existing
  };
}
