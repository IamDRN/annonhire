"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { Globe2, Linkedin, Mail, ShieldCheck, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { DividerText } from "@/components/auth/divider-text";
import { FormErrorMessage } from "@/components/auth/form-error-message";
import { PasswordInput } from "@/components/auth/password-input";
import { SocialLoginButton } from "@/components/auth/social-login-button";
import { TrustBadgeRow } from "@/components/auth/trust-badge-row";

type Mode = "login" | "signup";

function CandidateOnboardingPreview() {
  const steps = [
    { title: "Upload resume", description: "Import your experience in seconds.", icon: Upload },
    { title: "Review anonymous profile", description: "Mask sensitive details before publishing.", icon: ShieldCheck },
    { title: "Get employer requests", description: "Choose who can contact you and when.", icon: Sparkles }
  ];

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">What happens next</p>
      <div className="mt-4 space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.title} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 dark:bg-slate-950">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-slate-800 dark:text-sky-300">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">Step {index + 1}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CandidateAuthForm({
  mode,
  googleEnabled
}: {
  mode: Mode;
  googleEnabled: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/candidate/dashboard";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();

  const isSignup = mode === "signup";

  const copy = useMemo(
    () =>
      isSignup
        ? {
            submit: "Create anonymous profile",
            prompt: "Already have an account?",
            href: "/candidate/login",
            linkText: "Log in"
          }
        : {
            submit: "Log in with email",
            prompt: "New here?",
            href: "/candidate/signup",
            linkText: "Create your anonymous profile"
          },
    [isSignup]
  );

  const submitCredentials = () =>
    startTransition(async () => {
      setError("");

      if (!form.email || !form.password) {
        setError("Please enter both email and password.");
        return;
      }

      if (isSignup) {
        const response = await fetch("/api/register/candidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });

        if (!response.ok) {
          const message = await response.text();
          setError(message || "Unable to create your account.");
          return;
        }
      }

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false
      });

      if (result?.error) {
        setError(isSignup ? "Account created, but sign-in failed." : "Invalid email or password.");
        return;
      }

      const session = await getSession();
      const role = session?.user?.role;
      router.push(role === "EMPLOYER" ? "/employer/dashboard" : role === "ADMIN" ? "/admin/dashboard" : callbackUrl);
    });

  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50/80 px-5 py-4 dark:border-sky-900/40 dark:bg-sky-950/20">
        <p className="text-sm leading-6 text-sky-900 dark:text-sky-100">
          {isSignup
            ? "Explore opportunities without revealing your identity. Your profile stays private until you approve contact."
            : "Stay private, stay in control, and respond only when the opportunity feels right."}
        </p>
      </div>

      <div className="grid gap-3">
        <SocialLoginButton
          icon={<Globe2 className="h-4 w-4" />}
          label={isSignup ? "Continue with Google" : "Continue with Google"}
          loading={googlePending}
          onClick={() =>
            startGoogleTransition(() => {
              if (!googleEnabled) {
                setError("Google login is not configured yet. Add AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET.");
                return;
              }

              void signIn("google", { callbackUrl });
            })
          }
        />
        <SocialLoginButton
          icon={<Linkedin className="h-4 w-4" />}
          label="Continue with LinkedIn"
          disabled
          variant="secondary"
          suffix={
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              Soon
            </span>
          }
        />
      </div>

      {!googleEnabled ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          Google sign-in is disabled in this environment. Callback URL:
          <code className="ml-1 rounded bg-white/70 px-1 py-0.5 dark:bg-slate-900">/api/auth/callback/google</code>
        </div>
      ) : null}

      <DividerText>or continue with email</DividerText>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="you@example.com"
            className="mt-2 h-12 rounded-2xl border-slate-200 bg-white/90"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {!isSignup ? (
              <Link href="/forgot-password" className="text-xs font-medium text-primary transition-colors hover:text-sky-500">
                Forgot password?
              </Link>
            ) : null}
          </div>
          <PasswordInput
            id="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="Enter a secure password"
            className="mt-2 h-12 rounded-2xl border-slate-200 bg-white/90"
          />
        </div>

        <FormErrorMessage message={error} />

        <Button type="button" className="h-12 w-full rounded-2xl" disabled={isPending} onClick={submitCredentials}>
          <Mail className="mr-2 h-4 w-4" />
          {isPending ? "Please wait..." : copy.submit}
        </Button>
      </div>

      {isSignup ? (
        <>
          <CandidateOnboardingPreview />
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Your personal details remain hidden by default. Employers only get access when you explicitly approve contact.
            </p>
          </div>
        </>
      ) : null}

      <AuthFooterLink prompt={copy.prompt} href={copy.href} label={copy.linkText} />

      <TrustBadgeRow
        items={[
          { icon: "secure", label: "Secure login" },
          { icon: "anonymous", label: "Anonymous profile" },
          { icon: "control", label: "You control visibility" }
        ]}
      />
    </div>
  );
}
