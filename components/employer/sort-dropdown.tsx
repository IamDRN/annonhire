"use client";

import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { label: "Most relevant", value: "best_match" },
  { label: "Newest", value: "newest" },
  { label: "Salary: High to Low", value: "salary_high_to_low" },
  { label: "Experience: Low to High", value: "experience_low_to_high" }
] as const;

export function SortDropdown({ value }: { value?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      value={value ?? "best_match"}
      onChange={(event) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sortBy", event.target.value);
        router.push(`/employer/search?${params.toString()}`);
      }}
      className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-[#6C63FF] focus:ring-2 focus:ring-[#EEF2FF]"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
