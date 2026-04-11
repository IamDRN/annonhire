"use client";

import { useState, useTransition } from "react";
import { saveParsedResume } from "@/actions/candidate-profile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toaster";

export function ParsedResumeEditor({
  candidateProfileId,
  initialValue
}: {
  candidateProfileId: string;
  initialValue: Record<string, any>;
}) {
  const [form, setForm] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const { pushToast } = useToast();
  const experienceText = (form.workExperience ?? [])
    .map((item: any) => [item.title, item.companyName, item.industry, item.description].filter(Boolean).join(" | "))
    .join("\n");
  const educationText = (form.education ?? [])
    .map((item: any) => [item.institution, item.degree, item.fieldOfStudy, item.graduationYear].filter(Boolean).join(" | "))
    .join("\n");
  const certificationText = (form.certifications ?? [])
    .map((item: any) => [item.name, item.issuer, item.year].filter(Boolean).join(" | "))
    .join("\n");

  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            value={form.fullName ?? ""}
            onChange={(event) => setForm({ ...form, fullName: event.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="headline">Professional title</Label>
          <Input
            id="headline"
            value={form.headline ?? ""}
            onChange={(event) => setForm({ ...form, headline: event.target.value })}
          />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={form.summary ?? ""}
          onChange={(event) => setForm({ ...form, summary: event.target.value })}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="experience">Work experience</Label>
        <Textarea
          id="experience"
          value={experienceText}
          onChange={(event) =>
            setForm({
              ...form,
              workExperience: event.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => {
                  const [title = "", companyName = "", industry = "", description = ""] = line.split("|").map((part) => part.trim());
                  return { title, companyName, industry, description };
                })
            })
          }
          placeholder="Title | Company | Industry | Description"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="education">Education</Label>
        <Textarea
          id="education"
          value={educationText}
          onChange={(event) =>
            setForm({
              ...form,
              education: event.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => {
                  const [institution = "", degree = "", fieldOfStudy = "", graduationYear = ""] = line.split("|").map((part) => part.trim());
                  return {
                    institution,
                    degree,
                    fieldOfStudy,
                    graduationYear: graduationYear ? Number(graduationYear) : undefined
                  };
                })
            })
          }
          placeholder="Institution | Degree | Field | Graduation year"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="certifications">Certifications</Label>
        <Textarea
          id="certifications"
          value={certificationText}
          onChange={(event) =>
            setForm({
              ...form,
              certifications: event.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => {
                  const [name = "", issuer = "", year = ""] = line.split("|").map((part) => part.trim());
                  return { name, issuer, year: year ? Number(year) : undefined };
                })
            })
          }
          placeholder="Certification | Issuer | Year"
        />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            value={(form.skills ?? []).join(", ")}
            onChange={(event) =>
              setForm({ ...form, skills: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })
            }
          />
        </div>
        <div>
          <Label htmlFor="location">Preferred location</Label>
          <Input
            id="location"
            value={form.preferredLocation ?? ""}
            onChange={(event) => setForm({ ...form, preferredLocation: event.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="years">Years of experience</Label>
          <Input
            id="years"
            type="number"
            value={form.yearsOfExperience ?? 0}
            onChange={(event) => setForm({ ...form, yearsOfExperience: Number(event.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="workMode">Work preference</Label>
          <Select
            id="workMode"
            value={form.workMode ?? "REMOTE"}
            onChange={(event) => setForm({ ...form, workMode: event.target.value })}
            options={[
              { label: "Remote", value: "REMOTE" },
              { label: "Hybrid", value: "HYBRID" },
              { label: "On-site", value: "ONSITE" },
              { label: "Flexible", value: "FLEXIBLE" }
            ]}
          />
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="salaryMin">Salary min</Label>
          <Input
            id="salaryMin"
            type="number"
            value={form.salaryExpectation?.min ?? 0}
            onChange={(event) =>
              setForm({
                ...form,
                salaryExpectation: { ...(form.salaryExpectation ?? {}), min: Number(event.target.value) }
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="salaryMax">Salary max</Label>
          <Input
            id="salaryMax"
            type="number"
            value={form.salaryExpectation?.max ?? 0}
            onChange={(event) =>
              setForm({
                ...form,
                salaryExpectation: { ...(form.salaryExpectation ?? {}), max: Number(event.target.value) }
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="noticePeriod">Notice period</Label>
          <Select
            id="noticePeriod"
            value={form.noticePeriod ?? "ONE_MONTH"}
            onChange={(event) => setForm({ ...form, noticePeriod: event.target.value })}
            options={[
              { label: "Immediate", value: "IMMEDIATE" },
              { label: "2 weeks", value: "TWO_WEEKS" },
              { label: "1 month", value: "ONE_MONTH" },
              { label: "2 months", value: "TWO_MONTHS" },
              { label: "3 months", value: "THREE_MONTHS" },
              { label: "Negotiable", value: "NEGOTIABLE" }
            ]}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await saveParsedResume(candidateProfileId, form);
              pushToast({ title: "Profile draft saved", description: "Your anonymous profile is ready for review." });
            })
          }
        >
          {isPending ? "Saving..." : "Save parsed profile"}
        </Button>
      </div>
    </Card>
  );
}
