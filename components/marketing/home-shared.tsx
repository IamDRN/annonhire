import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MarketingSection({
  id,
  className,
  children
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("border-b border-slate-200/80 py-20 md:py-28 dark:border-slate-800", className)}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center"
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  const alignment = align === "left" ? "max-w-2xl text-left" : "mx-auto max-w-3xl text-center";

  return (
    <div className={alignment}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl dark:text-white">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg dark:text-slate-300">{description}</p>
    </div>
  );
}

export function TrustPill({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-950">
      {label}
    </div>
  );
}

export function SkillTag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-950">
      {label}
    </span>
  );
}

export function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

export function StepItem({
  icon,
  step,
  title,
  description
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors group-hover:border-slate-300 group-hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:group-hover:border-slate-700 dark:group-hover:bg-slate-950">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{step}</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
  );
}

export function PrivacyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700">
      <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-slate-900">
        {value}
      </span>
    </div>
  );
}

export function BulletPoint({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
        <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-900" />
      </div>
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

export function MarketingLinkButton({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all",
        variant === "primary"
          ? "bg-slate-900 text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
      )}
    >
      {children}
    </Link>
  );
}
