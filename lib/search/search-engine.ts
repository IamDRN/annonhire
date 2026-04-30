import { ContactRequestStatus, EmployerVerificationStatus, Prisma, WorkMode } from "@prisma/client";
import { calculateMatchScore } from "@/lib/match-score";
import { prisma } from "@/lib/db/prisma";
import type { CandidateCardView, SearchFilters } from "@/types";

export interface CandidateSearchProvider {
  search(filters: SearchFilters): Promise<CandidateCardView[]>;
}

class PrismaCandidateSearchProvider implements CandidateSearchProvider {
  async search(filters: SearchFilters): Promise<CandidateCardView[]> {
    const where: Prisma.CandidateProfileWhereInput = {
      AND: [
        {
          OR: [{ privacySetting: { is: null } }, { privacySetting: { is: { searchable: true } } }]
        }
      ],
      ...(filters.keyword
        ? {
            OR: [
              { headline: { contains: filters.keyword, mode: "insensitive" } },
              { summary: { contains: filters.keyword, mode: "insensitive" } },
              { skills: { some: { name: { contains: filters.keyword, mode: "insensitive" } } } }
            ]
          }
        : {}),
      ...(filters.skills?.length
        ? {
            skills: {
              some: {
                name: {
                  in: filters.skills
                }
              }
            }
          }
        : {}),
      ...(filters.industry ? { industryBackground: { contains: filters.industry, mode: "insensitive" } } : {}),
      ...(filters.location ? { preferredLocation: { contains: filters.location, mode: "insensitive" } } : {}),
      ...(filters.workMode ? { workMode: filters.workMode } : {}),
      ...(filters.workModes?.length ? { workMode: { in: filters.workModes } } : {}),
      ...(typeof filters.salaryMin === "number" || typeof filters.salaryMax === "number"
        ? {
            AND: [
              ...(typeof filters.salaryMin === "number" ? [{ salaryExpectationMax: { gte: filters.salaryMin } }] : []),
              ...(typeof filters.salaryMax === "number" ? [{ salaryExpectationMin: { lte: filters.salaryMax } }] : [])
            ]
          }
        : {}),
      ...(filters.noticePeriod ? { noticePeriod: filters.noticePeriod } : {}),
      ...(filters.education
        ? {
            education: {
              some: {
                OR: [
                  { degree: { contains: filters.education, mode: "insensitive" } },
                  { fieldOfStudy: { contains: filters.education, mode: "insensitive" } },
                  { institution: { contains: filters.education, mode: "insensitive" } }
                ]
              }
            }
          }
        : {}),
      ...(typeof filters.profileCompleteness === "number"
        ? { profileCompleteness: { gte: filters.profileCompleteness } }
        : {}),
      ...(typeof filters.lastActiveDays === "number"
        ? { lastActiveAt: { gte: new Date(Date.now() - filters.lastActiveDays * 24 * 60 * 60 * 1000) } }
        : {}),
      ...(typeof filters.yearsMin === "number" || typeof filters.yearsMax === "number"
        ? {
            yearsOfExperience: {
              ...(typeof filters.yearsMin === "number" ? { gte: filters.yearsMin } : {}),
              ...(typeof filters.yearsMax === "number" ? { lte: filters.yearsMax } : {})
            }
          }
        : {})
    };

    const orderBy: Prisma.CandidateProfileOrderByWithRelationInput[] =
      filters.sortBy === "highest_experience"
        ? [{ yearsOfExperience: "desc" }]
        : filters.sortBy === "experience_low_to_high"
          ? [{ yearsOfExperience: "asc" }]
          : filters.sortBy === "salary_high_to_low"
            ? [{ salaryExpectationMax: "desc" }]
            : filters.sortBy === "earliest_availability"
              ? [{ noticePeriod: "asc" }]
              : filters.sortBy === "newest"
                ? [{ createdAt: "desc" }]
                : [{ lastActiveAt: "desc" }];

    const records = await prisma.candidateProfile.findMany({
      where,
      orderBy,
      include: {
        skills: true,
        privacySetting: true,
        education: true
      },
      take: 30
    });

    return records
      .map((record) => {
      const skillNames = record.skills.map((skill) => skill.name);
      const experienceLevel = getExperienceLevel(record.headline, record.yearsOfExperience);
      const category = getCategory(record.headline, skillNames, record.industryBackground);
      const lastActiveDaysAgo = Math.max(
        0,
        Math.floor((Date.now() - new Date(record.lastActiveAt).getTime()) / (1000 * 60 * 60 * 24))
      );
      const match = calculateMatchScore(
        {
          skills: skillNames,
          yearsOfExperience: record.yearsOfExperience,
          preferredLocation: record.preferredLocation,
          workMode: record.workMode,
          salaryExpectationMin: record.salaryExpectationMin,
          salaryExpectationMax: record.salaryExpectationMax,
          noticePeriod: record.noticePeriod,
          profileCompleteness: record.profileCompleteness
        },
        filters
      );

      return {
        id: record.id,
        anonymousId: record.anonymousId,
        headline: record.headline,
        yearsOfExperience: record.yearsOfExperience,
        industryBackground: record.industryBackground,
        salaryExpectationMin: record.salaryExpectationMin,
        salaryExpectationMax: record.salaryExpectationMax,
        preferredLocation: record.preferredLocation,
        workMode: record.workMode,
        noticePeriod: record.noticePeriod,
        matchScore: match.totalScore,
        profileCompleteness: record.profileCompleteness,
        lastActiveDaysAgo,
        experienceLevel,
        category,
        isFeatured: record.profileCompleteness >= 85,
        isNew: lastActiveDaysAgo <= 7,
        skills: skillNames,
        summary: record.summary,
        matchedSkills: match.matchedSkills,
        missingSkills: match.missingSkills,
        matchExplanation: match.explanation,
        isSaved: false
      };
    })
      .filter((record) => {
        if (filters.experienceLevels?.length) {
          const levelKey = experienceLabelToKey(record.experienceLevel);
          if (!filters.experienceLevels.includes(levelKey)) {
            return false;
          }
        }

        if (filters.categories?.length && !filters.categories.includes(record.category)) {
          return false;
        }

        if (filters.availability && !matchesAvailability(filters.availability, record.noticePeriod)) {
          return false;
        }

        return true;
      });
  }
}

export const candidateSearchProvider: CandidateSearchProvider = new PrismaCandidateSearchProvider();

export async function canEmployerSearch(userId: string) {
  const employer = await prisma.employerProfile.findUnique({
    where: { userId }
  });

  return employer?.verificationStatus === EmployerVerificationStatus.VERIFIED;
}

export async function getEmployerSearchDashboard(userId: string) {
  const employer = await prisma.employerProfile.findUnique({
    where: { userId },
    include: {
      sentRequests: true,
      savedCandidates: true,
      savedSearches: true
    }
  });

  return {
    employer,
    metrics: {
      requestsSent: employer?.sentRequests.length ?? 0,
      activeRequests:
        employer?.sentRequests.filter((request) => request.status === ContactRequestStatus.PENDING).length ?? 0,
      savedCandidates: employer?.savedCandidates.length ?? 0,
      savedSearches: employer?.savedSearches.length ?? 0
    }
  };
}

export async function searchEmployerCandidates(userId: string, filters: SearchFilters) {
  const [employer, results] = await Promise.all([
    prisma.employerProfile.findUnique({
      where: { userId },
      include: {
        savedCandidates: true
      }
    }),
    candidateSearchProvider.search(filters)
  ]);

  const savedCandidateIds = new Set(employer?.savedCandidates.map((item) => item.candidateProfileId) ?? []);

  return {
    employerProfileId: employer?.id,
    results: results.map((candidate) => ({
      ...candidate,
      isSaved: savedCandidateIds.has(candidate.id)
    }))
  };
}

function getExperienceLevel(headline: string | null, years: number): CandidateCardView["experienceLevel"] {
  const normalized = `${headline ?? ""}`.toLowerCase();
  if (normalized.includes("director")) return "Director";
  if (normalized.includes("manager") || normalized.includes("lead")) return "Manager";
  if (years <= 2) return "Entry Level";
  if (years <= 5) return "Mid Level";
  return "Senior Level";
}

function getCategory(
  headline: string | null,
  skills: string[],
  industryBackground: string | null
): CandidateCardView["category"] {
  const haystack = `${headline ?? ""} ${skills.join(" ")} ${industryBackground ?? ""}`.toLowerCase();

  if (matches(haystack, ["hr", "human resources", "recruit", "talent", "people ops"])) return "HR";
  if (matches(haystack, ["finance", "account", "bank", "fintech", "tax", "audit"])) return "Finance";
  if (matches(haystack, ["engineer", "developer", "software", "data", "next.js", "react", "typescript", "sql"])) return "IT";
  if (matches(haystack, ["sales", "account executive", "business development", "revenue"])) return "Sales";
  if (matches(haystack, ["marketing", "growth", "seo", "content", "lifecycle"])) return "Marketing";
  if (matches(haystack, ["operations", "project", "program", "ops"])) return "Operations";
  return "Customer Service";
}

function matches(haystack: string, needles: string[]) {
  return needles.some((needle) => haystack.includes(needle));
}

function experienceLabelToKey(
  label: CandidateCardView["experienceLevel"]
): NonNullable<SearchFilters["experienceLevels"]>[number] {
  if (label === "Entry Level") return "entry";
  if (label === "Mid Level") return "mid";
  if (label === "Senior Level") return "senior";
  if (label === "Manager") return "manager";
  return "director";
}

function matchesAvailability(availability: string, noticePeriod: CandidateCardView["noticePeriod"]) {
  if (availability === "immediate") {
    return noticePeriod === "IMMEDIATE";
  }

  if (availability === "within_30_days") {
    return ["IMMEDIATE", "TWO_WEEKS", "ONE_MONTH"].includes(noticePeriod);
  }

  if (availability === "flexible") {
    return true;
  }

  return true;
}

export const employerSearchMeta = {
  hintChips: ["Front-End", "HR", "Finance", "Remote", "React", "Sales"],
  categoryOptions: ["HR", "Finance", "IT", "Sales", "Marketing", "Operations", "Customer Service"] as const,
  experienceOptions: ["entry", "mid", "senior", "manager", "director"] as const,
  workModeOptions: [
    { label: "Remote", value: WorkMode.REMOTE },
    { label: "Hybrid", value: WorkMode.HYBRID },
    { label: "On-site", value: WorkMode.ONSITE },
    { label: "Flexible", value: WorkMode.FLEXIBLE }
  ] as const
};
