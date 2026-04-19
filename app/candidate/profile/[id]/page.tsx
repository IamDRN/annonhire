import { notFound } from "next/navigation";
import { Building2, GraduationCap, MapPin, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrencyRange } from "@/lib/utils";
import { getDemoAnonymousProfile, getMaskedExperienceLabel } from "@/services/dashboard-service";

export default async function CandidateAnonymousProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getDemoAnonymousProfile(id);

  if (!profile) {
    notFound();
  }

  return (
    <main className="container-width py-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {profile.anonymousId}
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">{profile.headline ?? "Anonymous Candidate"}</h1>
            <p className="mt-4 text-sm leading-7 text-muted">{profile.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill.id}>{skill.name}</Badge>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold">Experience</h2>
            <div className="mt-5 space-y-4">
              {profile.workExperience.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    <Building2 className="mr-2 inline h-4 w-4" />
                    {getMaskedExperienceLabel(item.companyName, item.companyMode, item.industry)}
                  </p>
                  {item.description ? <p className="mt-2 text-sm text-slate-600">{item.description}</p> : null}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold">Education and certifications</h2>
            <div className="mt-5 space-y-4">
              {profile.education.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="font-medium">
                    <GraduationCap className="mr-2 inline h-4 w-4" />
                    {profile.privacySetting?.revealEducationInstitution ? item.institution : "Confidential Institution"}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {item.degree}
                    {item.fieldOfStudy ? ` • ${item.fieldOfStudy}` : ""}
                  </p>
                </div>
              ))}
              {profile.certifications.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">{item.issuer ?? "Accredited issuer"}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="h-fit">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Privacy-first profile. Contact data stays hidden until candidate approval.
          </div>
          <h2 className="mt-6 text-xl font-semibold">At a glance</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-600">
            <p>
              <Timer className="mr-2 inline h-4 w-4" />
              {profile.yearsOfExperience} years of experience
            </p>
            <p>
              <MapPin className="mr-2 inline h-4 w-4" />
              {profile.preferredLocation ?? "Flexible location"}
            </p>
            <p>Industry: {profile.industryBackground ?? "Multi-sector"}</p>
            <p>Salary: {formatCurrencyRange(profile.salaryExpectationMin, profile.salaryExpectationMax)}</p>
            <p>Notice period: {profile.noticePeriod.replaceAll("_", " ")}</p>
            <p>Work preference: {profile.workMode}</p>
          </div>
          <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm text-muted">
            Full name, email, phone, exact address, LinkedIn URL, and sensitive employer identifiers remain hidden until candidate approval.
          </div>
          <Button className="mt-6 w-full" disabled>
            HIRE ME
          </Button>
        </Card>
      </div>
    </main>
  );
}
