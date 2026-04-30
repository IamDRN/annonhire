"use client";

import { useState, useTransition } from "react";
import { Bookmark } from "lucide-react";
import { toggleSavedCandidate } from "@/actions/saved-candidates";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";

export function SaveCandidateButton({
  candidateId,
  employerProfileId,
  initialSaved
}: {
  candidateId: string;
  employerProfileId?: string;
  initialSaved: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const { pushToast } = useToast();

  return (
    <Button
      type="button"
      variant="outline"
      disabled={!employerProfileId || isPending}
      className={`rounded-2xl px-5 ${saved ? "border-[#6C63FF] bg-[#EEF2FF] text-[#6C63FF]" : "border-slate-200 bg-white hover:border-[#6C63FF] hover:bg-[#EEF2FF] hover:text-[#6C63FF]"}`}
      onClick={() =>
        startTransition(async () => {
          if (!employerProfileId) {
            return;
          }

          const result = await toggleSavedCandidate(employerProfileId, candidateId);
          setSaved(result.saved);
          pushToast({
            title: result.saved ? "Candidate saved" : "Candidate removed",
            description: result.saved
              ? "Added to your shortlist for follow-up."
              : "Removed from your shortlist."
          });
        })
      }
    >
      <Bookmark className={`mr-2 h-4 w-4 ${saved ? "fill-current" : ""}`} />
      {isPending ? "Saving..." : saved ? "Saved" : "Save"}
    </Button>
  );
}
