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
  workModes?: WorkMode[];
  experienceLevels?: ("entry" | "mid" | "senior" | "manager" | "director")[];
  categories?: ("HR" | "Finance" | "IT" | "Sales" | "Marketing" | "Operations" | "Customer Service")[];
  availability?: string;
  lastActiveDays?: number;
  profileCompleteness?: number;
  sortBy?: "best_match" | "newest" | "highest_experience" | "earliest_availability" | "salary_high_to_low" | "experience_low_to_high";
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
  lastActiveDaysAgo: number;
  experienceLevel: "Entry Level" | "Mid Level" | "Senior Level" | "Manager" | "Director";
  category: "HR" | "Finance" | "IT" | "Sales" | "Marketing" | "Operations" | "Customer Service";
  isFeatured: boolean;
  isNew: boolean;
  skills: string[];
  summary: string | null;
  matchedSkills: string[];
  missingSkills: string[];
  matchExplanation: string;
  isSaved: boolean;
};

export type ContactDisclosureMode = "messaging_only" | "reveal_contact";

export type EmployerVerificationState = EmployerVerificationStatus;
export type RequestState = ContactRequestStatus;
export type AppRole = "CANDIDATE" | "EMPLOYER" | "ADMIN";
export type CompanyPrivacyMode = PrivacyCompanyMode;
