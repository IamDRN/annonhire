"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { SearchFilters } from "@/types";
import { Button } from "@/components/ui/button";
import { FilterGroup } from "@/components/employer/filter-group";
import { MobileFilterDrawer } from "@/components/employer/mobile-filter-drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

type FilterOption = {
  label: string;
  value: string;
  count: number;
};

type FilterCounts = {
  workModes: FilterOption[];
  experienceLevels: FilterOption[];
  categories: FilterOption[];
};

export function JobFilterSidebar({
  initial,
  counts
}: {
  initial: SearchFilters;
  counts: FilterCounts;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [workModes, setWorkModes] = useState<string[]>(initial.workModes?.map(String) ?? []);
  const [experienceLevels, setExperienceLevels] = useState<string[]>(initial.experienceLevels ?? []);
  const [categories, setCategories] = useState<string[]>(initial.categories ?? []);
  const [skills, setSkills] = useState((initial.skills ?? []).join(", "));
  const [yearsMin, setYearsMin] = useState(initial.yearsMin?.toString() ?? "");
  const [yearsMax, setYearsMax] = useState(initial.yearsMax?.toString() ?? "");
  const [salaryMin, setSalaryMin] = useState(initial.salaryMin?.toString() ?? "");
  const [salaryMax, setSalaryMax] = useState(initial.salaryMax?.toString() ?? "");
  const [noticePeriod, setNoticePeriod] = useState(initial.noticePeriod ?? "");
  const [education, setEducation] = useState(initial.education ?? "");
  const [profileCompleteness, setProfileCompleteness] = useState(initial.profileCompleteness?.toString() ?? "");
  const [availability, setAvailability] = useState(initial.availability ?? "");

  const apply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (skills.trim()) params.set("skills", skills.split(",").map((item) => item.trim()).filter(Boolean).join(","));
    else params.delete("skills");
    if (yearsMin) params.set("yearsMin", yearsMin);
    else params.delete("yearsMin");
    if (yearsMax) params.set("yearsMax", yearsMax);
    else params.delete("yearsMax");
    if (salaryMin) params.set("salaryMin", salaryMin);
    else params.delete("salaryMin");
    if (salaryMax) params.set("salaryMax", salaryMax);
    else params.delete("salaryMax");
    if (noticePeriod) params.set("noticePeriod", noticePeriod);
    else params.delete("noticePeriod");
    params.delete("workMode");
    if (workModes.length) params.set("workModes", workModes.join(","));
    else params.delete("workModes");
    if (experienceLevels.length) params.set("experienceLevels", experienceLevels.join(","));
    else params.delete("experienceLevels");
    if (categories.length) params.set("categories", categories.join(","));
    else params.delete("categories");
    if (education.trim()) params.set("education", education);
    else params.delete("education");
    if (profileCompleteness) params.set("profileCompleteness", profileCompleteness);
    else params.delete("profileCompleteness");
    if (availability) params.set("availability", availability);
    else params.delete("availability");
    router.push(`/employer/search?${params.toString()}`);
  };

  const clear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("skills");
    params.delete("yearsMin");
    params.delete("yearsMax");
    params.delete("salaryMin");
    params.delete("salaryMax");
    params.delete("noticePeriod");
    params.delete("workMode");
    params.delete("workModes");
    params.delete("experienceLevels");
    params.delete("categories");
    params.delete("education");
    params.delete("profileCompleteness");
    params.delete("availability");
    router.push(`/employer/search?${params.toString()}`);
    setSkills("");
    setYearsMin("");
    setYearsMax("");
    setSalaryMin("");
    setSalaryMax("");
    setNoticePeriod("");
    setWorkModes([]);
    setExperienceLevels([]);
    setCategories([]);
    setEducation("");
    setProfileCompleteness("");
    setAvailability("");
  };

  const content = (
    <div className="space-y-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        <button type="button" onClick={clear} className="text-sm font-medium text-slate-500 transition hover:text-[#6C63FF]">
          Clear filters
        </button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="skills">Skills</Label>
        <Input
          id="skills"
          value={skills}
          onChange={(event) => setSkills(event.target.value)}
          placeholder="React, SQL, Recruiting"
          className="rounded-2xl border-slate-200"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <div className="space-y-2">
          <Label htmlFor="yearsMin">Min experience</Label>
          <Input id="yearsMin" type="number" value={yearsMin} onChange={(event) => setYearsMin(event.target.value)} className="rounded-2xl border-slate-200" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="yearsMax">Max experience</Label>
          <Input id="yearsMax" type="number" value={yearsMax} onChange={(event) => setYearsMax(event.target.value)} className="rounded-2xl border-slate-200" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <div className="space-y-2">
          <Label htmlFor="salaryMin">Min salary</Label>
          <Input id="salaryMin" type="number" value={salaryMin} onChange={(event) => setSalaryMin(event.target.value)} className="rounded-2xl border-slate-200" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salaryMax">Max salary</Label>
          <Input id="salaryMax" type="number" value={salaryMax} onChange={(event) => setSalaryMax(event.target.value)} className="rounded-2xl border-slate-200" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="noticePeriod">Notice period</Label>
        <Select
          id="noticePeriod"
          value={noticePeriod}
          onChange={(event) => setNoticePeriod(event.target.value)}
          className="rounded-2xl border-slate-200"
          options={[
            { label: "Any", value: "" },
            { label: "Immediate", value: "IMMEDIATE" },
            { label: "Two weeks", value: "TWO_WEEKS" },
            { label: "One month", value: "ONE_MONTH" },
            { label: "Two months", value: "TWO_MONTHS" },
            { label: "Three months", value: "THREE_MONTHS" },
            { label: "Negotiable", value: "NEGOTIABLE" }
          ]}
        />
      </div>
      <FilterGroup title="Work Setup" options={counts.workModes} selectedValues={workModes} onToggle={(value) => toggle(value, workModes, setWorkModes)} />
      <div className="border-t border-slate-200" />
      <FilterGroup
        title="Experience Level"
        options={counts.experienceLevels}
        selectedValues={experienceLevels}
        onToggle={(value) => toggle(value, experienceLevels, setExperienceLevels)}
      />
      <div className="border-t border-slate-200" />
      <FilterGroup
        title="Category"
        options={counts.categories}
        selectedValues={categories}
        onToggle={(value) => toggle(value, categories, setCategories)}
      />
      <div className="border-t border-slate-200" />
      <div className="space-y-2">
        <Label htmlFor="education">Education</Label>
        <Input
          id="education"
          value={education}
          onChange={(event) => setEducation(event.target.value)}
          placeholder="Bachelor, MBA, Computer Science"
          className="rounded-2xl border-slate-200"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profileCompleteness">Profile completeness</Label>
        <Input
          id="profileCompleteness"
          type="number"
          min={0}
          max={100}
          value={profileCompleteness}
          onChange={(event) => setProfileCompleteness(event.target.value)}
          placeholder="80"
          className="rounded-2xl border-slate-200"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="availability">Availability</Label>
        <Select
          id="availability"
          value={availability}
          onChange={(event) => setAvailability(event.target.value)}
          className="rounded-2xl border-slate-200"
          options={[
            { label: "Any", value: "" },
            { label: "Immediate", value: "immediate" },
            { label: "Within 30 days", value: "within_30_days" },
            { label: "Flexible", value: "flexible" }
          ]}
        />
      </div>
      <Button type="button" className="h-12 w-full bg-[#6C63FF] hover:bg-[#5b52f5]" onClick={apply}>
        Apply filters
      </Button>
    </div>
  );

  return (
    <>
      <div className="sticky top-24 hidden lg:block">{content}</div>
      <MobileFilterDrawer>{content}</MobileFilterDrawer>
    </>
  );
}

function toggle(
  value: string,
  current: string[],
  setState: Dispatch<SetStateAction<string[]>>
) {
  setState(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
}
