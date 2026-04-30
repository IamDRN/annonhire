import { JobCardSkeleton } from "@/components/employer/job-card-skeleton";

export default function EmployerSearchLoading() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] py-8 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <div className="h-7 w-40 rounded-full bg-slate-100" />
          <div className="mt-5 h-12 w-2/3 rounded-2xl bg-slate-100" />
          <div className="mt-3 h-5 w-1/2 rounded-2xl bg-slate-100" />
          <div className="mt-8 grid gap-3 lg:grid-cols-[1.35fr_1fr_auto]">
            <div className="h-14 rounded-2xl bg-slate-100" />
            <div className="h-14 rounded-2xl bg-slate-100" />
            <div className="h-14 rounded-2xl bg-slate-200" />
          </div>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] lg:block">
            <div className="h-5 w-20 rounded bg-slate-100" />
            <div className="mt-6 space-y-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-10 rounded-2xl bg-slate-100" />
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <div className="h-5 w-40 rounded bg-slate-100" />
              <div className="mt-3 h-4 w-60 rounded bg-slate-100" />
            </div>
            {Array.from({ length: 3 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
