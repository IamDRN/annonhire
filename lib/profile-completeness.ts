import type { NoticePeriod, PrivacyCompanyMode, WorkMode } from "@prisma/client";

type ProfileSkill = {
  name: string;
};

type ProfileWorkExperience = {
  title?: string | null;
  companyName?: string | null;
};

type ProfileEducation = {
  institution?: string | null;
  degree?: string | null;
};

type ProfilePrivacySetting = {
  searchable?: boolean;
  showExactCity?: boolean;
  companyMode?: PrivacyCompanyMode;
  revealEducationInstitution?: boolean;
  revealGraduationYear?: boolean;
  allowMessagingOnly?: boolean;
} | null;

export type CandidateProfileForCompleteness = {
  headline?: string | null;
  summary?: string | null;
  skills?: ProfileSkill[];
  workExperience?: ProfileWorkExperience[];
  education?: ProfileEducation[];
  salaryExpectationMin?: number | null;
  salaryExpectationMax?: number | null;
  preferredLocation?: string | null;
  workMode?: WorkMode | null;
  noticePeriod?: NoticePeriod | null;
  privacySetting?: ProfilePrivacySetting;
};

export type MissingProfileItem = {
  key:
    | "headline"
    | "summary"
    | "skills"
    | "experience"
    | "education"
    | "salary"
    | "notice"
    | "preferences"
    | "privacy";
  label: string;
  description: string;
  href: string;
  actionLabel: string;
  weight: number;
};

export type ProfileCompletenessResult = {
  score: number;
  completedSections: string[];
  missingSections: MissingProfileItem[];
  suggestedNextActions: MissingProfileItem[];
};

const COMPLETENESS_ITEMS: Array<{
  key: MissingProfileItem["key"];
  label: string;
  weight: number;
  href: string;
  actionLabel: string;
  description: string;
  isComplete: (profile: CandidateProfileForCompleteness) => boolean;
}> = [
  {
    key: "headline",
    label: "Professional headline",
    weight: 10,
    href: "/candidate/onboarding?step=2#editor",
    actionLabel: "Add headline",
    description: "Add the title employers should associate with your profile.",
    isComplete: (profile) => Boolean(profile.headline?.trim())
  },
  {
    key: "summary",
    label: "Summary",
    weight: 10,
    href: "/candidate/onboarding?step=2#editor",
    actionLabel: "Write summary",
    description: "A short summary helps employers understand your strengths quickly.",
    isComplete: (profile) => Boolean(profile.summary?.trim())
  },
  {
    key: "skills",
    label: "Top skills",
    weight: 15,
    href: "/candidate/onboarding?step=2#editor",
    actionLabel: "Add skills",
    description: "Add your top skills so employers can find you more easily.",
    isComplete: (profile) => (profile.skills?.length ?? 0) > 0
  },
  {
    key: "experience",
    label: "Work experience",
    weight: 20,
    href: "/candidate/onboarding?step=2#editor",
    actionLabel: "Add experience",
    description: "Add your experience to help employers evaluate your fit.",
    isComplete: (profile) => (profile.workExperience?.length ?? 0) > 0
  },
  {
    key: "education",
    label: "Education",
    weight: 10,
    href: "/candidate/onboarding?step=2#editor",
    actionLabel: "Add education",
    description: "Education adds extra context, especially for early-career profiles.",
    isComplete: (profile) => (profile.education?.length ?? 0) > 0
  },
  {
    key: "salary",
    label: "Salary expectation",
    weight: 10,
    href: "/candidate/onboarding?step=2#editor",
    actionLabel: "Set salary range",
    description: "A salary range helps employers understand alignment earlier.",
    isComplete: (profile) =>
      typeof profile.salaryExpectationMin === "number" &&
      typeof profile.salaryExpectationMax === "number" &&
      profile.salaryExpectationMin > 0 &&
      profile.salaryExpectationMax >= profile.salaryExpectationMin
  },
  {
    key: "notice",
    label: "Notice period",
    weight: 10,
    href: "/candidate/onboarding?step=2#editor",
    actionLabel: "Set notice period",
    description: "Share your availability so employers know how quickly you can move.",
    isComplete: (profile) => Boolean(profile.noticePeriod && profile.noticePeriod !== "NEGOTIABLE")
  },
  {
    key: "preferences",
    label: "Location and work mode",
    weight: 10,
    href: "/candidate/onboarding?step=2#editor",
    actionLabel: "Set preferences",
    description: "Set your preferred location and work mode to improve matching.",
    isComplete: (profile) => Boolean(profile.preferredLocation?.trim() || (profile.workMode && profile.workMode !== "FLEXIBLE"))
  },
  {
    key: "privacy",
    label: "Privacy settings",
    weight: 5,
    href: "/candidate/onboarding?step=3#privacy",
    actionLabel: "Review privacy",
    description: "Set your privacy preferences before publishing to employers.",
    isComplete: (profile) => Boolean(profile.privacySetting)
  }
];

export function getMissingProfileItems(profile: CandidateProfileForCompleteness): MissingProfileItem[] {
  return COMPLETENESS_ITEMS.filter((item) => !item.isComplete(profile)).map((item) => ({
    key: item.key,
    label: item.label,
    description: item.description,
    href: item.href,
    actionLabel: item.actionLabel,
    weight: item.weight
  }));
}

export function calculateProfileCompleteness(profile: CandidateProfileForCompleteness): ProfileCompletenessResult {
  const completedSections = COMPLETENESS_ITEMS.filter((item) => item.isComplete(profile));
  const missingSections = getMissingProfileItems(profile);
  const score = completedSections.reduce((total, item) => total + item.weight, 0);

  return {
    score,
    completedSections: completedSections.map((item) => item.label),
    missingSections,
    suggestedNextActions: missingSections.slice(0, 4)
  };
}
