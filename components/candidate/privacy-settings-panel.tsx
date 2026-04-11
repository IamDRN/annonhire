"use client";

import { useState, useTransition } from "react";
import { updatePrivacySettings } from "@/actions/candidate-profile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toaster";

export function PrivacySettingsPanel({
  candidateProfileId,
  initial
}: {
  candidateProfileId: string;
  initial: {
    searchable: boolean;
    showExactCity: boolean;
    companyMode: "EXACT" | "MASKED" | "INDUSTRY_ONLY";
    revealEducationInstitution: boolean;
    revealGraduationYear: boolean;
    allowMessagingOnly: boolean;
    blockedDomains: string[];
  };
}) {
  const [form, setForm] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const { pushToast } = useToast();

  return (
    <Card id="privacy">
      <h3 className="text-lg font-semibold">Privacy controls</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="rounded-2xl border border-slate-200 p-4 text-sm">
          <input
            type="checkbox"
            className="mr-2"
            checked={form.searchable}
            onChange={(event) => setForm({ ...form, searchable: event.target.checked })}
          />
          Searchable by verified employers
        </label>
        <label className="rounded-2xl border border-slate-200 p-4 text-sm">
          <input
            type="checkbox"
            className="mr-2"
            checked={form.showExactCity}
            onChange={(event) => setForm({ ...form, showExactCity: event.target.checked })}
          />
          Show exact city instead of region only
        </label>
        <label className="rounded-2xl border border-slate-200 p-4 text-sm">
          <input
            type="checkbox"
            className="mr-2"
            checked={form.revealEducationInstitution}
            onChange={(event) => setForm({ ...form, revealEducationInstitution: event.target.checked })}
          />
          Reveal education institution
        </label>
        <label className="rounded-2xl border border-slate-200 p-4 text-sm">
          <input
            type="checkbox"
            className="mr-2"
            checked={form.revealGraduationYear}
            onChange={(event) => setForm({ ...form, revealGraduationYear: event.target.checked })}
          />
          Reveal graduation year
        </label>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="companyMode">Company masking</Label>
          <Select
            id="companyMode"
            value={form.companyMode}
            onChange={(event) => setForm({ ...form, companyMode: event.target.value as never })}
            options={[
              { label: "Show exact company", value: "EXACT" },
              { label: "Show masked company", value: "MASKED" },
              { label: "Show industry only", value: "INDUSTRY_ONLY" }
            ]}
          />
        </div>
        <div>
          <Label htmlFor="messagingMode">Approval behavior</Label>
          <Select
            id="messagingMode"
            value={form.allowMessagingOnly ? "messaging_only" : "reveal_contact"}
            onChange={(event) => setForm({ ...form, allowMessagingOnly: event.target.value === "messaging_only" })}
            options={[
              { label: "Messaging only after approval", value: "messaging_only" },
              { label: "Reveal contact after approval", value: "reveal_contact" }
            ]}
          />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="blockedDomains">Blocked employer domains</Label>
        <Input
          id="blockedDomains"
          value={form.blockedDomains.join(", ")}
          onChange={(event) =>
            setForm({
              ...form,
              blockedDomains: event.target.value.split(",").map((item) => item.trim()).filter(Boolean)
            })
          }
          placeholder="example.com, another-company.com"
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await updatePrivacySettings(candidateProfileId, form);
              pushToast({ title: "Privacy updated", description: "Your visibility and disclosure settings were saved." });
            })
          }
        >
          {isPending ? "Saving..." : "Save privacy settings"}
        </Button>
      </div>
    </Card>
  );
}
