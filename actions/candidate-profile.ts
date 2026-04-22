"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { parsedResumeSchema, privacySettingsSchema } from "@/lib/validations";
import {
  markCandidateOnboardingCompleted,
  syncCandidateProfileCompleteness,
  updateCandidateOnboardingStep
} from "@/services/profile-completeness-service";

export async function saveParsedResume(candidateProfileId: string, values: unknown) {
  const payload = parsedResumeSchema.parse(values);

  await prisma.skill.deleteMany({ where: { candidateProfileId } });
  await prisma.workExperience.deleteMany({ where: { candidateProfileId } });
  await prisma.education.deleteMany({ where: { candidateProfileId } });
  await prisma.certification.deleteMany({ where: { candidateProfileId } });

  await prisma.candidateProfile.update({
    where: { id: candidateProfileId },
    data: {
      fullName: payload.fullName,
      headline: payload.headline,
      summary: payload.summary,
      yearsOfExperience: payload.yearsOfExperience,
      preferredLocation: payload.preferredLocation,
      salaryExpectationMin: payload.salaryExpectation.min,
      salaryExpectationMax: payload.salaryExpectation.max,
      noticePeriod: payload.noticePeriod,
      workMode: payload.workMode,
      onboardingStep: {
        set: 3
      },
      skills: {
        create: payload.skills.map((name) => ({ name }))
      },
      workExperience: {
        create: payload.workExperience.map((item) => ({
          title: item.title,
          companyName: item.companyName,
          industry: item.industry,
          description: item.description
        }))
      },
      education: {
        create: payload.education
      },
      certifications: {
        create: payload.certifications
      }
    }
  });

  await syncCandidateProfileCompleteness(candidateProfileId);

  revalidatePath("/candidate/onboarding");
  revalidatePath("/candidate/dashboard");
}

export async function updatePrivacySettings(candidateProfileId: string, values: unknown) {
  const payload = privacySettingsSchema.parse(values);

  await prisma.privacySetting.upsert({
    where: { candidateProfileId },
    update: {
      searchable: payload.searchable,
      showExactCity: payload.showExactCity,
      companyMode: payload.companyMode,
      revealEducationInstitution: payload.revealEducationInstitution,
      revealGraduationYear: payload.revealGraduationYear,
      allowMessagingOnly: payload.allowMessagingOnly
    },
    create: {
      candidateProfileId,
      searchable: payload.searchable,
      showExactCity: payload.showExactCity,
      companyMode: payload.companyMode,
      revealEducationInstitution: payload.revealEducationInstitution,
      revealGraduationYear: payload.revealGraduationYear,
      allowMessagingOnly: payload.allowMessagingOnly
    }
  });

  await prisma.blockedEmployer.deleteMany({ where: { candidateProfileId } });
  if (payload.blockedDomains.length) {
    await prisma.blockedEmployer.createMany({
      data: payload.blockedDomains.map((employerDomain) => ({
        candidateProfileId,
        employerDomain
      }))
    });
  }

  await syncCandidateProfileCompleteness(candidateProfileId);

  revalidatePath("/candidate/onboarding");
  revalidatePath("/candidate/dashboard");
}

export async function saveOnboardingStep(candidateProfileId: string, step: number) {
  await updateCandidateOnboardingStep(candidateProfileId, step);
  revalidatePath("/candidate/onboarding");
  revalidatePath("/candidate/dashboard");
}

export async function completeCandidateOnboarding(candidateProfileId: string) {
  await markCandidateOnboardingCompleted(candidateProfileId);
  revalidatePath("/candidate/onboarding");
  revalidatePath("/candidate/dashboard");
}
