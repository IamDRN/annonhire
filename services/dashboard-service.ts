import { EmployerVerificationStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { maskCompanyName } from "@/lib/utils";

export async function getCandidateDashboard(userId: string) {
  return prisma.candidateProfile.findUnique({
    where: { userId },
    include: {
      user: true,
      resume: true,
      skills: true,
      workExperience: true,
      education: true,
      certifications: true,
      privacySetting: true,
      blockedEmployers: true,
      receivedRequests: {
        include: {
          employerProfile: {
            include: {
              company: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
}

export async function getEmployerDashboard(userId: string) {
  return prisma.employerProfile.findUnique({
    where: { userId },
    include: {
      company: true,
      sentRequests: {
        include: {
          candidateProfile: {
            include: {
              skills: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      },
      savedCandidates: {
        include: {
          candidateProfile: {
            include: {
              skills: true
            }
          }
        }
      },
      savedSearches: true
    }
  });
}

export async function getAdminDashboard() {
  const [pendingEmployers, flaggedCandidates, requestLogs, notifications] = await Promise.all([
    prisma.employerProfile.findMany({
      where: { verificationStatus: EmployerVerificationStatus.PENDING },
      include: { company: true, user: true }
    }),
    prisma.candidateProfile.findMany({
      where: { searchVisibility: false },
      include: { user: true }
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10
    }),
    prisma.notification.count()
  ]);

  return {
    pendingEmployers,
    flaggedCandidates,
    requestLogs,
    notifications
  };
}

export async function getHomepageData() {
  const candidates = await prisma.candidateProfile.findMany({
    take: 6,
    include: {
      skills: true
    },
    orderBy: {
      lastActiveAt: "desc"
    }
  });

  return {
    featuredSkills: ["Next.js", "TypeScript", "Product Design", "SQL", "Lifecycle Marketing", "Customer Success"],
    testimonials: [
      {
        name: "Talent Lead, verified employer",
        quote: "AnonHire helped us engage high-signal candidates without compromising their privacy."
      },
      {
        name: "Anonymous product candidate",
        quote: "I could explore opportunities without exposing my identity to the entire market."
      }
    ],
    previewCandidates: candidates.map((candidate) => ({
      id: candidate.id,
      anonymousId: candidate.anonymousId,
      headline: candidate.headline,
      yearsOfExperience: candidate.yearsOfExperience,
      summary: candidate.summary,
      preferredLocation: candidate.preferredLocation,
      skills: candidate.skills.map((skill) => skill.name),
      industryBackground: candidate.industryBackground,
      salaryExpectationMin: candidate.salaryExpectationMin,
      salaryExpectationMax: candidate.salaryExpectationMax,
      noticePeriod: candidate.noticePeriod,
      workMode: candidate.workMode,
      matchScore: 84
    }))
  };
}

export function getMaskedExperienceLabel(companyName: string, mode: "EXACT" | "MASKED" | "INDUSTRY_ONLY", industry?: string | null) {
  if (mode === "EXACT") return companyName;
  if (mode === "INDUSTRY_ONLY") return industry ?? "Confidential industry";
  return maskCompanyName(companyName);
}

export async function getNotificationsForUser(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 8
  });
}

export async function getDemoAnonymousProfile(profileIdOrSlug: string) {
  if (profileIdOrSlug === "demo") {
    return prisma.candidateProfile.findFirst({
      include: {
        skills: true,
        workExperience: true,
        education: true,
        certifications: true,
        privacySetting: true
      }
    });
  }

  return prisma.candidateProfile.findUnique({
    where: { id: profileIdOrSlug },
    include: {
      skills: true,
      workExperience: true,
      education: true,
      certifications: true,
      privacySetting: true
    }
  });
}

export async function getRoleHome(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return "/";
  if (user.role === "CANDIDATE") return "/candidate/dashboard";
  if (user.role === "EMPLOYER") return "/employer/dashboard";
  return "/admin/dashboard";
}
