import { prisma } from "@/lib/db/prisma";
import {
  calculateProfileCompleteness,
  type CandidateProfileForCompleteness,
  type ProfileCompletenessResult
} from "@/lib/profile-completeness";

const completenessInclude = {
  skills: true,
  workExperience: true,
  education: true,
  privacySetting: true
} as const;

export async function getCandidateProfileForCompleteness(candidateProfileId: string) {
  return prisma.candidateProfile.findUnique({
    where: { id: candidateProfileId },
    include: completenessInclude
  });
}

export async function syncCandidateProfileCompleteness(candidateProfileId: string) {
  const profile = await getCandidateProfileForCompleteness(candidateProfileId);
  if (!profile) {
    return null;
  }

  const result = calculateProfileCompleteness(profile satisfies CandidateProfileForCompleteness);
  const derivedStep = getDerivedOnboardingStep(profile, result);

  const updated = await prisma.candidateProfile.update({
    where: { id: candidateProfileId },
    data: {
      profileCompleteness: result.score,
      onboardingStep: Math.max(profile.onboardingStep, derivedStep)
    },
    include: completenessInclude
  });

  return {
    profile: updated,
    completeness: result
  };
}

export async function markCandidateOnboardingCompleted(candidateProfileId: string) {
  const synced = await syncCandidateProfileCompleteness(candidateProfileId);
  if (!synced) {
    return null;
  }

  const updatedProfile = await prisma.candidateProfile.update({
    where: { id: candidateProfileId },
    data: {
      onboardingCompleted: true,
      onboardingStep: 5
    }
  });

  return {
    profile: updatedProfile,
    completeness: synced.completeness
  };
}

export async function updateCandidateOnboardingStep(candidateProfileId: string, step: number) {
  return prisma.candidateProfile.update({
    where: { id: candidateProfileId },
    data: {
      onboardingStep: step
    }
  });
}

export function getDerivedOnboardingStep(
  profile: Pick<CandidateProfileForCompleteness, "privacySetting" | "skills" | "workExperience" | "education" | "headline" | "summary">,
  completeness: ProfileCompletenessResult
) {
  if (!profile.headline && !profile.summary && (profile.skills?.length ?? 0) === 0 && (profile.workExperience?.length ?? 0) === 0) {
    return 1;
  }

  if (!profile.privacySetting) {
    return 3;
  }

  if (completeness.score < 80) {
    return 4;
  }

  return 5;
}
