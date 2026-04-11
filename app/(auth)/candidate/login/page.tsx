"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CandidateLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <main className="container-width py-16">
      <Card className="mx-auto max-w-lg">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-muted">Use the same login flow for candidate, employer, and admin roles.</p>
        <div className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button
            className="w-full"
            onClick={() =>
              startTransition(async () => {
                const result = await signIn("credentials", { ...form, redirect: false });
                if (result?.error) {
                  setError("Invalid credentials.");
                  return;
                }
                const session = await getSession();
                const role = session?.user?.role;
                router.push(
                  role === "EMPLOYER"
                    ? "/employer/dashboard"
                    : role === "ADMIN"
                      ? "/admin/dashboard"
                      : "/candidate/dashboard"
                );
              })
            }
          >
            {isPending ? "Signing in..." : "Continue"}
          </Button>
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted">
          <Link href="/candidate/signup" className="text-primary">
            Create account
          </Link>
          <Link href="/forgot-password" className="text-primary">
            Forgot password?
          </Link>
        </div>
      </Card>
    </main>
  );
}
