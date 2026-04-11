"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchFilters as SearchFilterType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export function SearchFilters({
  initial,
  onApply
}: {
  initial?: SearchFilterType;
  onApply?: (filters: SearchFilterType) => void;
}) {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilterType>(initial ?? { sortBy: "best_match" });

  const apply = () => {
    if (onApply) {
      onApply(filters);
      return;
    }

    const params = new URLSearchParams();
    if (filters.keyword) params.set("keyword", filters.keyword);
    if (filters.industry) params.set("industry", filters.industry);
    if (filters.location) params.set("location", filters.location);
    if (filters.workMode) params.set("workMode", filters.workMode);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    router.push(`/employer/search?${params.toString()}`);
  };

  return (
    <Card className="sticky top-24 p-5">
      <h3 className="text-lg font-semibold">Filter candidates</h3>
      <div className="mt-5 space-y-4">
        <div>
          <Label htmlFor="keyword">Keyword / skill / title</Label>
          <Input
            id="keyword"
            value={filters.keyword ?? ""}
            onChange={(event) => setFilters((current) => ({ ...current, keyword: event.target.value }))}
            placeholder="TypeScript, Designer, Data"
          />
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={filters.industry ?? ""}
            onChange={(event) => setFilters((current) => ({ ...current, industry: event.target.value }))}
            placeholder="SaaS, FinTech..."
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={filters.location ?? ""}
            onChange={(event) => setFilters((current) => ({ ...current, location: event.target.value }))}
            placeholder="Remote or region"
          />
        </div>
        <div>
          <Label htmlFor="workMode">Work type</Label>
          <Select
            id="workMode"
            value={filters.workMode ?? ""}
            onChange={(event) => setFilters((current) => ({ ...current, workMode: event.target.value as never }))}
            options={[
              { label: "Any", value: "" },
              { label: "Remote", value: "REMOTE" },
              { label: "Hybrid", value: "HYBRID" },
              { label: "On-site", value: "ONSITE" },
              { label: "Flexible", value: "FLEXIBLE" }
            ]}
          />
        </div>
        <div>
          <Label htmlFor="sortBy">Sort by</Label>
          <Select
            id="sortBy"
            value={filters.sortBy ?? "best_match"}
            onChange={(event) => setFilters((current) => ({ ...current, sortBy: event.target.value as never }))}
            options={[
              { label: "Best match", value: "best_match" },
              { label: "Newest", value: "newest" },
              { label: "Highest experience", value: "highest_experience" },
              { label: "Earliest availability", value: "earliest_availability" }
            ]}
          />
        </div>
        <Button className="w-full" onClick={apply}>
          Apply filters
        </Button>
      </div>
    </Card>
  );
}
