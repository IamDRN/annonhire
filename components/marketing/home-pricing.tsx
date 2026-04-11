import Link from "next/link";
import { pricingTiers } from "@/components/marketing/homepage-data";
import { MarketingSection, SectionHeading } from "@/components/marketing/home-shared";

function PricingCard({
  title,
  price,
  features,
  cta,
  featured,
  href
}: {
  title: string;
  price: string;
  features: string[];
  cta: string;
  featured: boolean;
  href: string;
}) {
  return (
    <div
      className={`rounded-3xl border p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${
        featured
          ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
      }`}
    >
      <p className={`text-sm font-medium ${featured ? "text-slate-300 dark:text-slate-600" : "text-slate-500 dark:text-slate-400"}`}>
        {title}
      </p>
      <h3 className="mt-4 text-3xl font-bold">{price}</h3>

      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <div className={`mt-1 h-2.5 w-2.5 rounded-full ${featured ? "bg-white dark:bg-slate-900" : "bg-slate-900 dark:bg-white"}`} />
            <p className={`text-sm ${featured ? "text-slate-200 dark:text-slate-700" : "text-slate-600 dark:text-slate-300"}`}>{feature}</p>
          </div>
        ))}
      </div>

      <Link
        href={href}
        className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
          featured
            ? "bg-white text-slate-900 hover:bg-slate-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

export function HomePricing() {
  return (
    <MarketingSection id="pricing" className="bg-white dark:bg-slate-950">
      <SectionHeading
        eyebrow="Pricing preview"
        title="Simple plans for candidates and employers"
        description="Keep candidates free to onboard while monetizing employer-side discovery and contact workflows."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <PricingCard key={tier.title} {...tier} />
        ))}
      </div>
    </MarketingSection>
  );
}
