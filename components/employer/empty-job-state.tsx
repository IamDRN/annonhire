"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyJobState({ onClear }: { onClear?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white px-8 py-14 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2FF] text-[#6C63FF]">
        <SearchX className="h-7 w-7" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-900">No jobs found</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Try adjusting your filters or searching with a broader keyword.
      </p>
      <Button
        type="button"
        className="mt-6 bg-[#6C63FF] hover:bg-[#5b52f5]"
        onClick={() => {
          if (onClear) {
            onClear();
            return;
          }

          const params = new URLSearchParams(searchParams.toString());
          ["keyword", "location", "workMode", "workModes", "experienceLevels", "categories", "sortBy"].forEach((key) =>
            params.delete(key)
          );
          router.push(`/employer/search${params.toString() ? `?${params.toString()}` : ""}`);
        }}
      >
        Clear filters
      </Button>
    </div>
  );
}
