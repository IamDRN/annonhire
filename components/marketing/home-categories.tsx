import { ChevronRight } from "lucide-react";
import { categories } from "@/components/marketing/homepage-data";
import { MarketingSection, SectionHeading } from "@/components/marketing/home-shared";

export function HomeCategories() {
  return (
    <MarketingSection className="bg-[#f7f8fc] dark:bg-slate-950">
      <SectionHeading
        eyebrow="Talent categories"
        title="Start with the roles employers search for most"
        description="A cleaner way to discover anonymous talent across the functions growing teams hire for every week."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map((category) => (
          <div
            key={category.title}
            className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_15px_38px_-30px_rgba(15,23,42,0.25)] transition duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-[0_22px_40px_-30px_rgba(108,99,255,0.42)] dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
          >
            <div className="flex flex-col items-start gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-slate-200 bg-slate-50 text-slate-700 transition-colors group-hover:border-primary/20 group-hover:bg-indigo-50 group-hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                {category.icon}
              </div>
              <div className="flex w-full items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-950 dark:text-white">{category.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{category.count}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300 transition-colors group-hover:text-primary dark:text-slate-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </MarketingSection>
  );
}
