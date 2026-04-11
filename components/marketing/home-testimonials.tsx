import { MarketingSection, SectionHeading } from "@/components/marketing/home-shared";

function TestimonialCard({
  quote,
  name,
  role
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700">
      <p className="text-lg leading-8 text-slate-700 dark:text-slate-200">&quot;{quote}&quot;</p>
      <div className="mt-6">
        <p className="font-semibold text-slate-900 dark:text-white">{name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
      </div>
    </div>
  );
}

export function HomeTestimonials() {
  return (
    <MarketingSection className="bg-slate-50 dark:bg-slate-900/30">
      <SectionHeading
        eyebrow="Trust & social proof"
        title="Built for candidates who value privacy and employers who value quality"
        description="Use this section for testimonials, adoption signals, verified company counts, and platform trust."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <TestimonialCard
          quote="I could explore opportunities without worrying that my current employer would find my resume online."
          name="Anonymous Candidate"
          role="HR Professional"
        />
        <TestimonialCard
          quote="The structured anonymous profiles helped us shortlist faster, and the HIRE ME request flow felt more respectful."
          name="Verified Employer"
          role="Talent Acquisition Team"
        />
      </div>
    </MarketingSection>
  );
}
