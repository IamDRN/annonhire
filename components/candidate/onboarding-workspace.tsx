"use client";

import { useState } from "react";
import { CheckCircle2, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { ParsedResumeEditor } from "@/components/candidate/parsed-resume-editor";
import { ResumeUploadDropzone } from "@/components/candidate/resume-upload-dropzone";
import { Card } from "@/components/ui/card";

export function OnboardingWorkspace({
  candidateProfileId,
  initialDraft
}: {
  candidateProfileId: string;
  initialDraft: Record<string, any>;
}) {
  const [draft, setDraft] = useState(initialDraft);

  return (
    <>
      <Card className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Candidate onboarding</p>
            <h2 className="mt-2 text-2xl font-semibold">Complete your profile in 3 quick steps</h2>
            <p className="mt-2 text-sm text-muted">
              Upload a resume, refine the parsed details, and confirm privacy settings before employers can discover you.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Identity stays hidden until you approve contact.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <FileText className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">1. Upload resume</p>
            <p className="mt-1 text-sm text-muted">Parse your draft profile from PDF or DOCX.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">2. Review details</p>
            <p className="mt-1 text-sm text-muted">Edit skills, experience, salary range, and summary.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">3. Confirm privacy</p>
            <p className="mt-1 text-sm text-muted">Choose visibility, masking, and contact preferences.</p>
          </div>
        </div>

        <div className="mt-6">
          <ResumeUploadDropzone onParsed={(parsed) => setDraft(parsed)} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-muted">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
            Uploaded resumes are used to create your private draft profile. Personal contact data is not exposed in employer search results.
          </div>
        </div>
      </Card>
      <ParsedResumeEditor candidateProfileId={candidateProfileId} initialValue={draft} />
    </>
  );
}
