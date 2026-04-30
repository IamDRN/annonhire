import { NoticePeriod, WorkMode } from "@prisma/client";
import type { SearchFilters } from "@/types";

type CandidateForMatchScore = {
  skills: string[];
  yearsOfExperience: number;
  preferredLocation: string | null;
  workMode: WorkMode;
  salaryExpectationMin: number | null;
  salaryExpectationMax: number | null;
  noticePeriod: NoticePeriod;
  profileCompleteness: number;
};

export type MatchScoreResult = {
  totalScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  explanation: string;
};

export function calculateMatchScore(
  candidate: CandidateForMatchScore,
  filters: SearchFilters
): MatchScoreResult {
  const requestedSkills = (filters.skills ?? []).map(normalize);
  const candidateSkills = candidate.skills.map(normalize);
  const matchedSkills = requestedSkills.filter((skill) => candidateSkills.includes(skill));
  const missingSkills = requestedSkills.filter((skill) => !candidateSkills.includes(skill));

  const skillScore =
    requestedSkills.length === 0 ? 26 : Math.round((matchedSkills.length / requestedSkills.length) * 40);

  const experienceScore = getExperienceScore(candidate.yearsOfExperience, filters);
  const locationWorkModeScore = getLocationWorkModeScore(candidate, filters);
  const salaryScore = getSalaryScore(candidate, filters);
  const noticeScore = getNoticeScore(candidate.noticePeriod, filters);
  const completenessScore = Math.min(5, Math.round((candidate.profileCompleteness / 100) * 5));

  const totalScore = Math.max(
    0,
    Math.min(100, skillScore + experienceScore + locationWorkModeScore + salaryScore + noticeScore + completenessScore)
  );

  const explanationParts = [
    matchedSkills.length
      ? `${matchedSkills.length} requested skill${matchedSkills.length === 1 ? "" : "s"} matched`
      : "Skills can be refined further",
    experienceScore >= 14 ? "experience is aligned" : "experience is partially aligned",
    locationWorkModeScore >= 10 ? "work setup fits the search" : "work setup may need review",
    noticeScore >= 7 ? "availability looks strong" : "availability is more flexible"
  ];

  return {
    totalScore,
    matchedSkills,
    missingSkills,
    explanation: explanationParts.join(", ")
  };
}

function getExperienceScore(years: number, filters: SearchFilters) {
  if (typeof filters.yearsMin !== "number" && typeof filters.yearsMax !== "number") {
    return 12;
  }

  const min = typeof filters.yearsMin === "number" ? filters.yearsMin : 0;
  const max = typeof filters.yearsMax === "number" ? filters.yearsMax : 50;
  if (years >= min && years <= max) {
    return 20;
  }

  const distance = years < min ? min - years : years - max;
  return Math.max(0, 20 - distance * 4);
}

function getLocationWorkModeScore(candidate: CandidateForMatchScore, filters: SearchFilters) {
  let score = 0;

  if (filters.location) {
    score += candidate.preferredLocation?.toLowerCase().includes(filters.location.toLowerCase()) ? 8 : 0;
  } else {
    score += 8;
  }

  const requestedModes = filters.workModes?.length ? filters.workModes : filters.workMode ? [filters.workMode] : [];
  if (requestedModes.length) {
    score += requestedModes.includes(candidate.workMode) ? 7 : 0;
  } else {
    score += 7;
  }

  return score;
}

function getSalaryScore(candidate: CandidateForMatchScore, filters: SearchFilters) {
  if (typeof filters.salaryMin !== "number" && typeof filters.salaryMax !== "number") {
    return 6;
  }

  const candidateMin = candidate.salaryExpectationMin ?? 0;
  const candidateMax = candidate.salaryExpectationMax ?? candidateMin;
  const filterMin = typeof filters.salaryMin === "number" ? filters.salaryMin : 0;
  const filterMax = typeof filters.salaryMax === "number" ? filters.salaryMax : Number.MAX_SAFE_INTEGER;

  const overlap = Math.max(0, Math.min(candidateMax, filterMax) - Math.max(candidateMin, filterMin));
  if (overlap > 0 || (candidateMin >= filterMin && candidateMax <= filterMax)) {
    return 10;
  }

  const distance = candidateMax < filterMin ? filterMin - candidateMax : candidateMin - filterMax;
  return Math.max(0, 10 - Math.ceil(distance / 10000));
}

function getNoticeScore(noticePeriod: NoticePeriod, filters: SearchFilters) {
  if (filters.noticePeriod) {
    return filters.noticePeriod === noticePeriod ? 10 : getNoticeRank(noticePeriod) <= getNoticeRank(filters.noticePeriod) ? 7 : 3;
  }

  if (filters.availability) {
    if (filters.availability === "immediate") {
      return noticePeriod === NoticePeriod.IMMEDIATE ? 10 : 2;
    }
    if (filters.availability === "within_30_days") {
      return ([NoticePeriod.IMMEDIATE, NoticePeriod.TWO_WEEKS, NoticePeriod.ONE_MONTH] as NoticePeriod[]).includes(noticePeriod) ? 10 : 4;
    }
    if (filters.availability === "flexible") {
      return 8;
    }
  }

  return 6;
}

function getNoticeRank(value: NoticePeriod) {
  switch (value) {
    case NoticePeriod.IMMEDIATE:
      return 0;
    case NoticePeriod.TWO_WEEKS:
      return 1;
    case NoticePeriod.ONE_MONTH:
      return 2;
    case NoticePeriod.TWO_MONTHS:
      return 3;
    case NoticePeriod.THREE_MONTHS:
      return 4;
    case NoticePeriod.NEGOTIABLE:
    default:
      return 5;
  }
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}
