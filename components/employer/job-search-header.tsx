"use client";

import { Search, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function JobSearchHeader({
  initialKeyword,
  initialLocation,
  hintChips
}: {
  initialKeyword?: string;
  initialLocation?: string;
  hintChips: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(initialKeyword ?? "");
  const [location, setLocation] = useState(initialLocation ?? "");

  const pushSearch = (nextKeyword = keyword) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextKeyword) params.set("keyword", nextKeyword);
    else params.delete("keyword");
    if (location) params.set("location", location);
    else params.delete("location");
    router.push(`/employer/search?${params.toString()}`);
  };

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-8">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#6C63FF]">
          <Sparkles className="h-3.5 w-3.5" />
          Employer search
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Discover anonymous talent with confidence.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
          Explore verified profiles and connect only when the fit is right. Privacy-first search built for modern hiring teams.
        </p>
      </div>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-[#F8FAFC] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr_auto]">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Job title, keyword, or skill"
            className="h-14 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#6C63FF] focus:ring-2 focus:ring-[#EEF2FF]"
          />
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Location or work mode"
            className="h-14 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#6C63FF] focus:ring-2 focus:ring-[#EEF2FF]"
          />
          <button
            type="button"
            onClick={() => pushSearch()}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#6C63FF] px-6 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(108,99,255,0.28)] transition hover:-translate-y-0.5 hover:bg-[#5b52f5]"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {hintChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => {
              setKeyword(chip);
              pushSearch(chip);
            }}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-[#EEF2FF] hover:text-[#6C63FF]"
          >
            {chip}
          </button>
        ))}
      </div>
    </section>
  );
}
