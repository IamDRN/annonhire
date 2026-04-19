import type React from "react";
import { CheckCircle2, EyeOff, ShieldCheck, Sparkles, Star, UserRoundCheck } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";

function SidePoint({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/50">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-slate-900 dark:text-sky-300">
        {icon}
      </div>
      <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">{text}</p>
    </div>
  );
}

export function AuthSidePanel({
  headline,
  subtext,
  trustMessage,
  points,
  previewLabel = "Anonymous candidate preview"
}: {
  headline: string;
  subtext: string;
  trustMessage: string;
  points: string[];
  previewLabel?: string;
}) {
  return (
    <aside className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.88),rgba(231,245,252,0.88))] p-6 shadow-[0_24px_100px_rgba(84,115,138,0.16)] backdrop-blur-xl dark:border-slate-800 dark:bg-[linear-gradient(160deg,rgba(15,23,42,0.95),rgba(15,29,44,0.9))] md:p-8 lg:p-10">
      <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-900/20" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-slate-200/40 blur-3xl dark:bg-slate-700/20" />

      <div className="relative">
        <BrandLogo linked={false} imageClassName="h-12 sm:h-14" />
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-800 dark:border-slate-700 dark:bg-slate-950/60 dark:text-sky-300">
          <Sparkles className="h-4 w-4" />
          Privacy-first hiring
        </p>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-[2.25rem]">{headline}</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">{subtext}</p>

        <div className="mt-8 grid gap-4">
          <SidePoint icon={<EyeOff className="h-4 w-4" />} text={points[0] ?? "Anonymous profile"} />
          <SidePoint icon={<ShieldCheck className="h-4 w-4" />} text={points[1] ?? "Verified employers"} />
          <SidePoint icon={<UserRoundCheck className="h-4 w-4" />} text={points[2] ?? "You control contact visibility"} />
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{previewLabel}</p>
          <div className="mt-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="h-3 w-24 rounded-full bg-slate-300/80 blur-[1px] dark:bg-slate-600" />
                <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Anonymous product marketer</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">5 years experience · Kathmandu</p>
              </div>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800 dark:bg-sky-950/40 dark:text-sky-300">
                Hidden identity
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Growth", "SEO", "Analytics", "B2B SaaS"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Current company</span>
                <span className="font-medium text-slate-900 dark:text-white">Masked employer</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Contact visibility</span>
                <span className="font-medium text-slate-900 dark:text-white">Candidate approval required</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-4 text-sm text-sky-900 dark:border-sky-900/40 dark:bg-sky-950/20 dark:text-sky-100">
          <Star className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{trustMessage}</p>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          Identity stays hidden until approval
        </div>
      </div>
    </aside>
  );
}
