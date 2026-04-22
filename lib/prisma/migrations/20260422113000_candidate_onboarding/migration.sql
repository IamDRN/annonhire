-- Add candidate onboarding state
ALTER TABLE "CandidateProfile"
ADD COLUMN "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "onboardingStep" INTEGER NOT NULL DEFAULT 1;
