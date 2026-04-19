"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, Building2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { FormErrorMessage } from "@/components/auth/form-error-message";
import { PasswordInput } from "@/components/auth/password-input";
import { TrustBadgeRow } from "@/components/auth/trust-badge-row";

type Mode = "login" | "signup";

export function EmployerAuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    designation: "",
    workEmail: "",
    password: "",
    companyName: "",
    website: ""
  });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const isSignup = mode === "signup";

  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50/80 px-5 py-4 dark:border-sky-900/40 dark:bg-sky-950/20">
        <p className="text-sm leading-6 text-sky-900 dark:text-sky-100">
          {isSignup
            ? "Create a trusted employer account and prepare for verification before reaching out to anonymous talent."
            : "Sign in with your work credentials to access a high-trust employer workspace built around candidate privacy."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {isSignup ? (
          <>
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                className="mt-2 h-12 rounded-2xl border-slate-200 bg-white/90"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Aarav Sharma"
              />
            </div>
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                className="mt-2 h-12 rounded-2xl border-slate-200 bg-white/90"
                value={form.designation}
                onChange={(event) => setForm({ ...form, designation: event.target.value })}
                placeholder="Talent Partner"
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company name</Label>
              <Input
                id="companyName"
                className="mt-2 h-12 rounded-2xl border-slate-200 bg-white/90"
                value={form.companyName}
                onChange={(event) => setForm({ ...form, companyName: event.target.value })}
                placeholder="Acme Labs"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                className="mt-2 h-12 rounded-2xl border-slate-200 bg-white/90"
                value={form.website}
                onChange={(event) => setForm({ ...form, website: event.target.value })}
                placeholder="https://company.com"
              />
            </div>
          </>
        ) : null}
        <div className={isSignup ? "" : "md:col-span-2"}>
          <Label htmlFor="workEmail">Work email</Label>
          <Input
            id="workEmail"
            type="email"
            className="mt-2 h-12 rounded-2xl border-slate-200 bg-white/90"
            value={form.workEmail}
            onChange={(event) => setForm({ ...form, workEmail: event.target.value })}
            placeholder="name@company.com"
          />
        </div>
        <div className={isSignup ? "" : "md:col-span-2"}>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            className="mt-2 h-12 rounded-2xl border-slate-200 bg-white/90"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="Use a strong password"
          />
        </div>
      </div>

      <FormErrorMessage message={error} />

      <Button
        type="button"
        className="h-12 w-full rounded-2xl"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError("");

            if (!form.workEmail || !form.password) {
              setError("Please enter your work email and password.");
              return;
            }

            if (isSignup) {
              const response = await fetch("/api/register/employer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
              });

              if (!response.ok) {
                const message = await response.text();
                setError(message || "Unable to create employer account.");
                return;
              }
            }

            const result = await signIn("credentials", {
              email: form.workEmail,
              password: form.password,
              redirect: false
            });

            if (result?.error) {
              setError(isSignup ? "Account created, but sign-in failed." : "Invalid work email or password.");
              return;
            }

            router.push("/employer/dashboard");
          })
        }
      >
        {isSignup ? <Building2 className="mr-2 h-4 w-4" /> : <BriefcaseBusiness className="mr-2 h-4 w-4" />}
        {isPending ? "Please wait..." : isSignup ? "Create employer account" : "Continue to employer portal"}
      </Button>

      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
        <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Employer access is tied to verification. Search and outreach unlock only after company review to protect candidate privacy and platform trust.
        </p>
      </div>

      {!isSignup ? (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950">
          <span className="text-slate-600 dark:text-slate-300">Forgot password?</span>
          <Link href="/forgot-password" className="font-semibold text-primary transition-colors hover:text-sky-500">
            Reset access
          </Link>
        </div>
      ) : null}

      <AuthFooterLink
        prompt={isSignup ? "Already registered?" : "Need an employer account?"}
        href={isSignup ? "/employer/login" : "/employer/signup"}
        label={isSignup ? "Log in" : "Start hiring smarter"}
      />

      <TrustBadgeRow
        items={[
          { icon: "secure", label: "Verified access" },
          { icon: "anonymous", label: "Anonymous talent pool" },
          { icon: "control", label: "Respectful outreach" }
        ]}
      />
    </div>
  );
}
