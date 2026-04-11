import { ContactRequestStatus, EmployerVerificationStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import type { CandidateCardView, SearchFilters } from "@/types";

export interface CandidateSearchProvider {
  search(filters: SearchFilters): Promise<CandidateCardView[]>;
}

class PrismaCandidateSearchProvider implements CandidateSearchProvider {
  async search(filters: SearchFilters): Promise<CandidateCardView[]> {
    const where: Prisma.CandidateProfileWhereInput = {
      searchVisibility: true,
      isSearchable: true,
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
      ...(filters.noticePeriod ? { noticePeriod: filters.noticePeriod } : {}),
      ...(typeof filters.profileCompleteness === "number"
        ? { profileCompleteness: { gte: filters.profileCompleteness } }
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
        : filters.sortBy === "earliest_availability"
          ? [{ noticePeriod: "asc" }]
          : filters.sortBy === "newest"
            ? [{ createdAt: "desc" }]
            : [{ lastActiveAt: "desc" }];

    const records = await prisma.candidateProfile.findMany({
      where,
      orderBy,
      include: {
        skills: true
      },
      take: 30
    });

    return records.map((record) => {
      const skillNames = record.skills.map((skill) => skill.name);
      const matchHits = filters.skills?.length
        ? filters.skills.filter((skill) => skillNames.includes(skill)).length
        : skillNames.slice(0, 3).length;
      const matchScore = Math.min(99, 60 + matchHits * 10 + Math.min(record.yearsOfExperience, 9));

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
        matchScore,
        skills: skillNames,
        summary: record.summary
      };
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
