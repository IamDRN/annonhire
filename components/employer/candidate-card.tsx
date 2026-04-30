import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Clock3, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import type { CandidateCardView } from "@/types";
import { formatCurrencyRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { JobBadge } from "@/components/employer/job-badge";
import { HireMeModal } from "@/components/employer/hire-me-modal";
import { SaveCandidateButton } from "@/components/employer/save-candidate-button";

export function CandidateCard({ candidate, employerProfileId }: { candidate: CandidateCardView; employerProfileId?: string }) {
  const initials = getInitials(candidate.headline ?? candidate.anonymousId);
  const companyLine = `${candidate.category} talent • ${candidate.preferredLocation ?? "Flexible location"}`;

  return (
    <article
      className={`group rounded-[28px] border bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#6C63FF] hover:shadow-[0_18px_40px_rgba(108,99,255,0.14)] ${
        candidate.isFeatured ? "border-[#c7d2fe] bg-gradient-to-b from-[#fafaff] to-white" : "border-slate-200"
      }`}
    >
      {candidate.isFeatured ? <div className="mb-5 h-1 w-20 rounded-full bg-[#6C63FF]" /> : null}
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2FF] text-base font-bold text-[#6C63FF]">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {candidate.isFeatured ? <JobBadge variant="featured">Featured</JobBadge> : null}
              {candidate.isNew ? <JobBadge variant="purple">New</JobBadge> : null}
              <JobBadge>{candidate.anonymousId}</JobBadge>
            </div>
            <h3 className="mt-3 text-[22px] font-semibold tracking-tight text-slate-900">
              {candidate.headline ?? "Anonymous candidate"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{companyLine}</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{candidate.summary ?? "Experienced professional open to privacy-first employer outreach."}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
          {candidate.profileCompleteness >= 80 ? <JobBadge variant="success">{candidate.profileCompleteness}% complete</JobBadge> : null}
          <JobBadge variant="purple">{candidate.matchScore}% match</JobBadge>
        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-600 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3">
          <BriefcaseBusiness className="h-4 w-4 text-[#6C63FF]" />
          <span>{candidate.experienceLevel}</span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3">
          <MapPin className="h-4 w-4 text-[#6C63FF]" />
          <span>{candidate.preferredLocation ?? "Flexible"}</span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3">
          <Sparkles className="h-4 w-4 text-[#6C63FF]" />
          <span>{candidate.workMode.replaceAll("_", "-")}</span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3">
          <Clock3 className="h-4 w-4 text-[#6C63FF]" />
          <span>{candidate.noticePeriod.replaceAll("_", " ")}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <JobBadge variant="purple">{candidate.category}</JobBadge>
        <JobBadge>{candidate.yearsOfExperience} years experience</JobBadge>
        {candidate.skills.slice(0, 4).map((skill) => (
          <JobBadge key={skill}>{skill}</JobBadge>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-5 border-t border-slate-100 pt-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm text-slate-500">Expected compensation</p>
          <p className="mt-1 text-lg font-semibold text-[#6C63FF]">
            {formatCurrencyRange(candidate.salaryExpectationMin, candidate.salaryExpectationMax)}
          </p>
          <p className="mt-2 text-sm text-slate-500">{candidate.matchExplanation}</p>
          {candidate.missingSkills.length ? (
            <p className="mt-2 text-xs font-medium text-slate-400">
              Missing skills: {candidate.missingSkills.slice(0, 3).join(", ")}
            </p>
          ) : null}
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="h-4 w-4 text-[#6C63FF]" />
            Last active {candidate.lastActiveDaysAgo === 0 ? "today" : `${candidate.lastActiveDaysAgo} day${candidate.lastActiveDaysAgo === 1 ? "" : "s"} ago`}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/candidate/profile/${candidate.id}`}>
            <Button variant="outline" className="rounded-2xl border-slate-200 bg-white px-5 hover:border-[#6C63FF] hover:bg-[#EEF2FF] hover:text-[#6C63FF]">
              View Details
            </Button>
          </Link>
          <SaveCandidateButton
            candidateId={candidate.id}
            employerProfileId={employerProfileId}
            initialSaved={candidate.isSaved}
          />
          <HireMeModal candidateId={candidate.id} employerProfileId={employerProfileId} />
          <span className="inline-flex items-center gap-2 self-center text-sm font-medium text-slate-400 transition group-hover:text-[#6C63FF]">
            Private outreach
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
