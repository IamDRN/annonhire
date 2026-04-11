import { ChevronRight } from "lucide-react";
import { categories } from "@/components/marketing/homepage-data";
import { MarketingSection, SectionHeading } from "@/components/marketing/home-shared";

export function HomeCategories() {
  return (
    <MarketingSection className="bg-slate-50 dark:bg-slate-900/30">
      <SectionHeading
        eyebrow="Talent categories"
        title="Explore candidates across high-demand functions"
        description="Give employers a quick overview of the talent pool and help candidates feel represented from day one."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                {category.icon}
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">{category.title}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{category.count}</p>
          </div>
        ))}
      </div>
    </MarketingSection>
  );
}
