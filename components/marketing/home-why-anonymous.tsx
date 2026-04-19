import type React from "react";
import { EyeOff, ShieldCheck, UserRoundCheck } from "lucide-react";
import { MarketingSection, SectionHeading } from "@/components/marketing/home-shared";

function WhyCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

export function HomeWhyAnonymous() {
  return (
    <MarketingSection className="bg-white dark:bg-slate-950">
      <SectionHeading
        eyebrow="Why anonymous?"
        title="Because great candidates should control the timing of exposure."
        description="AnonHire protects people who are open to opportunity but not ready for their identity, employer, or personal contact details to circulate publicly."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <WhyCard
          icon={<EyeOff className="h-5 w-5" />}
          title="Explore quietly"
          description="Candidates can test the market without alerting their current employer or exposing personal contact details too early."
        />
        <WhyCard
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Preserve trust"
          description="Employer verification and consent-based outreach create a safer environment for both sides of the conversation."
        />
        <WhyCard
          icon={<UserRoundCheck className="h-5 w-5" />}
          title="Connect with intent"
          description="Employers still see structured signal like skills, experience, salary range, and notice period before requesting contact."
        />
      </div>
    </MarketingSection>
  );
}
