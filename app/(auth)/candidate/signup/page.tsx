"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CandidateSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <main className="container-width py-16">
      <Card className="mx-auto max-w-lg">
        <h1 className="text-2xl font-semibold">Candidate sign up</h1>
        <p className="mt-2 text-sm text-muted">Create your anonymous candidate account and continue to resume upload onboarding.</p>
        <div className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button
            className="w-full"
            type="button"
            onClick={() =>
              startTransition(async () => {
                setError("");
                const response = await fetch("/api/register/candidate", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(form)
                });

                if (!response.ok) {
                  setError("Unable to create account.");
                  return;
                }

                const result = await signIn("credentials", { ...form, redirect: false });
                if (result?.error) {
                  setError("Account created, but sign-in failed.");
                  return;
                }

                router.push("/candidate/dashboard");
              })
            }
          >
            {isPending ? "Creating account..." : "Create candidate account"}
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted">
          Already registered?{" "}
          <Link href="/candidate/login" className="text-primary">
            Log in
          </Link>
        </p>
      </Card>
    </main>
  );
}
