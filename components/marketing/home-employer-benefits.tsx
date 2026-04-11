import type React from "react";
import { Briefcase, Search, ShieldCheck } from "lucide-react";
import { MarketingLinkButton, MarketingSection, SectionHeading } from "@/components/marketing/home-shared";

function BenefitCard({
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

export function HomeEmployerBenefits() {
  return (
    <MarketingSection id="employers" className="bg-white dark:bg-slate-950">
      <SectionHeading
        eyebrow="For employers"
        title="A cleaner, smarter way to source talent"
        description="Search verified anonymous profiles with confidence and engage only when the fit is right."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <BenefitCard
          icon={<Search className="h-5 w-5" />}
          title="Search by skills and filters"
          description="Find candidates using structured filters like skills, experience, location, salary, availability, and more."
        />
        <BenefitCard
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Hire ethically and privately"
          description="Protect candidate identity while still gaining enough profile depth to assess quality and fit."
        />
        <BenefitCard
          icon={<Briefcase className="h-5 w-5" />}
          title="Request contact directly"
          description="Use the HIRE ME flow to send interest, share role details, and wait for candidate approval."
        />
      </div>

      <div className="mt-10">
        <MarketingLinkButton href="/employer/signup">Create Employer Account</MarketingLinkButton>
      </div>
    </MarketingSection>
  );
}
