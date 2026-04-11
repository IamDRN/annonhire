"use client";

import { useState } from "react";
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
      <Card>
        <h2 className="text-xl font-semibold">Resume manager</h2>
        <p className="mt-2 text-sm text-muted">Upload a resume, parse structured details, then review before publishing.</p>
        <div className="mt-6">
          <ResumeUploadDropzone onParsed={(parsed) => setDraft(parsed)} />
        </div>
      </Card>
      <ParsedResumeEditor candidateProfileId={candidateProfileId} initialValue={draft} />
    </>
  );
}
