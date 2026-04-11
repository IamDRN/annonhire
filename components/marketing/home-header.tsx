"use client";

import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MarketingLinkButton } from "@/components/marketing/home-shared";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Browse Talent", href: "#browse-talent" },
  { label: "For Employers", href: "#employers" },
  { label: "Pricing", href: "#pricing" }
];

export function HomeHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
            <ShieldCheck className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">AnonHire</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Privacy-first talent discovery</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <MarketingLinkButton href="/candidate/login" variant="secondary">
            Login
          </MarketingLinkButton>
          <MarketingLinkButton href="/candidate/signup">Upload Resume</MarketingLinkButton>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="inline-flex rounded-xl border border-slate-300 p-2 text-slate-700 transition-colors hover:bg-slate-50 md:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-slate-200 transition-all duration-200 md:hidden dark:border-slate-800",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-3 px-6 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="grid gap-3 pt-2">
            <MarketingLinkButton href="/candidate/login" variant="secondary">
              Login
            </MarketingLinkButton>
            <MarketingLinkButton href="/candidate/signup">Upload Resume</MarketingLinkButton>
          </div>
        </div>
      </div>
    </header>
  );
}
