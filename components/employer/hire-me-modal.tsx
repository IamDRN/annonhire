"use client";

import { useState, useTransition } from "react";
import { createContactRequest } from "@/actions/contact-requests";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toaster";

export function HireMeModal({ candidateId, employerProfileId }: { candidateId: string; employerProfileId?: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    jobTitle: "",
    message: "",
    reason: ""
  });
  const { pushToast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!employerProfileId}>HIRE ME</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send contact request</DialogTitle>
          <DialogDescription>
            Share the role, why you’re interested, and any context the candidate needs before responding.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="jobTitle">Job title</Label>
            <Input id="jobTitle" value={form.jobTitle} onChange={(event) => setForm({ ...form, jobTitle: event.target.value })} />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
          </div>
          <div>
            <Label htmlFor="reason">Reason for interest</Label>
            <Textarea id="reason" value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} />
          </div>
          <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-muted">
            Optional JD attachment placeholder. Wire this to object storage in production.
          </div>
          <div className="flex justify-end">
            <Button
              disabled={isPending || !employerProfileId}
              onClick={() =>
                startTransition(async () => {
                  await createContactRequest(employerProfileId!, {
                    candidateProfileId: candidateId,
                    jobTitle: form.jobTitle,
                    message: form.message,
                    reason: form.reason
                  });
                  setOpen(false);
                  pushToast({ title: "Request sent", description: "The candidate can now accept, reject, or ask for details." });
                })
              }
            >
              {isPending ? "Sending..." : "Send request"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
