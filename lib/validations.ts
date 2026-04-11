import { NoticePeriod, PrivacyCompanyMode, WorkMode } from "@prisma/client";
import { z } from "zod";

export const candidateSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.literal("candidate")
});

export const employerSignupSchema = z.object({
  name: z.string().min(2),
  workEmail: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().min(2),
  website: z.string().url().optional().or(z.literal("")),
  designation: z.string().min(2),
  role: z.literal("employer")
});

export const resumeUploadSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.enum([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ])
});

export const parsedResumeSchema = z.object({
  fullName: z.string().min(2),
  headline: z.string().min(2),
  summary: z.string().min(10),
  skills: z.array(z.string().min(1)).min(1),
  workExperience: z.array(
    z.object({
      title: z.string().min(2),
      companyName: z.string().min(2),
      industry: z.string().optional(),
      description: z.string().optional()
    })
  ),
  education: z.array(
    z.object({
      institution: z.string().min(2),
      degree: z.string().min(2),
      fieldOfStudy: z.string().optional(),
      graduationYear: z.number().optional()
    })
  ),
  certifications: z.array(
    z.object({
      name: z.string().min(2),
      issuer: z.string().optional(),
      year: z.number().optional()
    })
  ),
  yearsOfExperience: z.number().min(0).max(50),
  preferredLocation: z.string().min(2),
  salaryExpectation: z.object({
    min: z.number().min(0),
    max: z.number().min(0)
  }),
  noticePeriod: z.nativeEnum(NoticePeriod),
  workMode: z.nativeEnum(WorkMode)
});

export const privacySettingsSchema = z.object({
  searchable: z.boolean(),
  showExactCity: z.boolean(),
  companyMode: z.nativeEnum(PrivacyCompanyMode),
  revealEducationInstitution: z.boolean(),
  revealGraduationYear: z.boolean(),
  allowMessagingOnly: z.boolean(),
  blockedDomains: z.array(z.string())
});

export const contactRequestSchema = z.object({
  candidateProfileId: z.string().min(1),
  jobTitle: z.string().min(2),
  message: z.string().min(10),
  reason: z.string().min(6)
});

export const searchFiltersSchema = z.object({
  keyword: z.string().optional(),
  skills: z.array(z.string()).optional(),
  yearsMin: z.coerce.number().optional(),
  yearsMax: z.coerce.number().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
  salaryMin: z.coerce.number().optional(),
  salaryMax: z.coerce.number().optional(),
  noticePeriod: z.nativeEnum(NoticePeriod).optional(),
  education: z.string().optional(),
  certification: z.string().optional(),
  language: z.string().optional(),
  workMode: z.nativeEnum(WorkMode).optional(),
  availability: z.string().optional(),
  lastActiveDays: z.coerce.number().optional(),
  profileCompleteness: z.coerce.number().optional(),
  sortBy: z.enum(["best_match", "newest", "highest_experience", "earliest_availability"]).optional()
});
