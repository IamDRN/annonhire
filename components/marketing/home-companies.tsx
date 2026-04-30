const companies = ["Google", "GitHub", "Microsoft", "GitLab", "Airbnb", "InVision"];

export function HomeCompanies() {
  return (
    <section id="companies" className="border-b border-slate-200/70 bg-[#f7f8fc] py-[4.5rem] dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white px-8 py-12 text-center shadow-[0_28px_60px_-46px_rgba(15,23,42,0.24)] dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary dark:text-sky-300">
            Featured companies
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Teams hiring with discretion and quality
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            AnonHire is designed for employers who want stronger signals, more respectful outreach, and better candidate trust.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {companies.map((company) => (
              <div
                key={company}
                className="flex h-20 items-center justify-center rounded-[1.4rem] border border-slate-200 bg-[#fafbff] px-4 text-base font-semibold text-slate-500 transition hover:-translate-y-0.5 hover:border-primary/20 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
