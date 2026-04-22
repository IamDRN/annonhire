import Link from "next/link";
import { BriefcaseBusiness, Clock3, MapPin, Sparkles } from "lucide-react";
import type { CandidateCardView } from "@/types";
import { formatCurrencyRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillTag } from "@/components/employer/skill-tag";
import { HireMeModal } from "@/components/employer/hire-me-modal";

export function CandidateCard({ candidate, employerProfileId }: { candidate: CandidateCardView; employerProfileId?: string }) {
  return (
    <Card className="h-full">
      <CardHeader className="items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{candidate.anonymousId}</p>
          <CardTitle className="mt-2">{candidate.headline ?? "Anonymous candidate"}</CardTitle>
          <p className="mt-2 text-sm text-muted">{candidate.summary}</p>
        </div>
          <div className="flex flex-wrap gap-2">
          {candidate.profileCompleteness >= 80 ? (
            <Badge variant="info">{candidate.profileCompleteness}% complete</Badge>
          ) : null}
          <Badge variant="success">{candidate.matchScore}% match</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4" />
            {candidate.yearsOfExperience} years
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {candidate.preferredLocation ?? "Flexible"}
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            {candidate.industryBackground ?? "Cross-functional"}
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {candidate.noticePeriod.replaceAll("_", " ")}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.skills.slice(0, 5).map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>
        <p className="mt-4 text-sm font-medium text-slate-700">
          Expected compensation: {formatCurrencyRange(candidate.salaryExpectationMin, candidate.salaryExpectationMax)}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/candidate/profile/${candidate.id}`}>
            <Button variant="outline">View Profile</Button>
          </Link>
          <Button variant="secondary">Save</Button>
          <HireMeModal candidateId={candidate.id} employerProfileId={employerProfileId} />
        </div>
      </CardContent>
    </Card>
  );
}
