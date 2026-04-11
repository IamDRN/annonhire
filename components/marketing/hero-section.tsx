"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, SearchCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="container-width py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge variant="info" className="mb-5 w-fit">
            Verified employers. Protected identity. Clean consent flow.
          </Badge>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
            Upload your resume anonymously. Get discovered by employers.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            AnonHire lets candidates stay private until they choose to engage, while verified employers search high-signal profiles with structured filters and intentional outreach.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/candidate/signup">
              <Button size="lg">
                Upload Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/employer/search">
              <Button size="lg" variant="outline">
                Search Talent
              </Button>
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="glass-panel p-4">
              <LockKeyhole className="h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-medium">PII hidden by default</p>
            </div>
            <div className="glass-panel p-4">
              <SearchCheck className="h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-medium">Search-ready structured profiles</p>
            </div>
            <div className="glass-panel p-4">
              <LockKeyhole className="h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-medium">Candidate-controlled contact release</p>
            </div>
          </div>
        </motion.div>
        <div className="glass-panel overflow-hidden p-6">
          <div className="rounded-2xl bg-slate-950 p-6 text-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Anonymous candidate profile</p>
                <p className="mt-1 text-2xl font-semibold">ANON-4J20R</p>
              </div>
              <Badge variant="success">92% match</Badge>
            </div>
            <div className="mt-6 rounded-2xl bg-white/10 p-5">
              <p className="text-lg font-medium">Full Stack Engineer</p>
              <p className="mt-2 text-sm text-slate-300">5 years experience • Remote • 1 month notice</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Next.js", "React", "Prisma", "Tailwind CSS"].map((skill) => (
                  <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-white p-4 text-slate-900">
                <p className="text-sm font-medium">Privacy mode</p>
                <p className="mt-2 text-sm text-slate-600">
                  Contact details are locked until the candidate approves your request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
