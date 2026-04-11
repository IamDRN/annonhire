"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmployerSignupPage() {
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

  return (
    <main className="container-width py-16">
      <Card className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold">Employer sign up</h1>
        <p className="mt-2 text-sm text-muted">Create a verified employer account with company onboarding details.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="workEmail">Work email</Label>
            <Input id="workEmail" type="email" required value={form.workEmail} onChange={(e) => setForm({ ...form, workEmail: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="companyName">Company name</Label>
            <Input id="companyName" required value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" type="url" placeholder="https://company.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          </div>
          {error ? <p className="text-sm text-danger md:col-span-2">{error}</p> : null}
          <div className="md:col-span-2">
            <Button
              className="w-full"
              type="button"
              onClick={() =>
                startTransition(async () => {
                  setError("");
                  const response = await fetch("/api/register/employer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                  });

                  if (!response.ok) {
                    setError("Unable to create employer account.");
                    return;
                  }

                  const result = await signIn("credentials", {
                    email: form.workEmail,
                    password: form.password,
                    redirect: false
                  });

                  if (result?.error) {
                    setError("Account created, but sign-in failed.");
                    return;
                  }

                  router.push("/employer/dashboard");
                })
              }
            >
              {isPending ? "Creating account..." : "Create employer account"}
            </Button>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          Already registered?{" "}
          <Link href="/employer/login" className="text-primary">
            Log in
          </Link>
        </p>
      </Card>
    </main>
  );
}
