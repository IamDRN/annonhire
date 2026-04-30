import { MarketingLinkButton } from "@/components/marketing/home-shared";

export function HomeNewsletter() {
  return (
    <section className="bg-[#f7f8fc] py-[4.5rem] dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-[#f1f4fb] px-6 py-10 text-center shadow-[0_30px_70px_-55px_rgba(15,23,42,0.25)] dark:border-slate-800 dark:bg-slate-900 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary dark:text-sky-300">Newsletter</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Subscribe for private hiring updates and company news
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Get product updates, trust announcements, and new role categories without turning your inbox into a job board.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:flex-row dark:border-slate-800 dark:bg-slate-950">
            <input
              type="email"
              placeholder="Enter your email address"
              className="h-12 flex-1 rounded-xl border border-transparent bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-primary/20 focus:bg-white dark:bg-slate-900 dark:text-slate-100"
            />
            <MarketingLinkButton href="/candidate/signup">Subscribe</MarketingLinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
