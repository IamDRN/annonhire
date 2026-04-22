import { ContactRequestStatus, EmployerVerificationStatus, NoticePeriod, PrivacyCompanyMode, WorkMode } from "@prisma/client";

export type SearchFilters = {
  keyword?: string;
  skills?: string[];
  yearsMin?: number;
  yearsMax?: number;
  industry?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  noticePeriod?: NoticePeriod;
  education?: string;
  certification?: string;
  language?: string;
  workMode?: WorkMode;
  availability?: string;
  lastActiveDays?: number;
  profileCompleteness?: number;
  sortBy?: "best_match" | "newest" | "highest_experience" | "earliest_availability";
};

export type CandidateCardView = {
  id: string;
  anonymousId: string;
  headline: string | null;
  yearsOfExperience: number;
  industryBackground: string | null;
  salaryExpectationMin: number | null;
  salaryExpectationMax: number | null;
  preferredLocation: string | null;
  workMode: WorkMode;
  noticePeriod: NoticePeriod;
  matchScore: number;
  profileCompleteness: number;
  skills: string[];
  summary: string | null;
};

export type ContactDisclosureMode = "messaging_only" | "reveal_contact";

export type EmployerVerificationState = EmployerVerificationStatus;
export type RequestState = ContactRequestStatus;
export type AppRole = "CANDIDATE" | "EMPLOYER" | "ADMIN";
export type CompanyPrivacyMode = PrivacyCompanyMode;
