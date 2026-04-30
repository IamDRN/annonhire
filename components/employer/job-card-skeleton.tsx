export function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="h-14 w-14 rounded-2xl bg-slate-200" />
          <div className="space-y-3">
            <div className="h-4 w-40 rounded bg-slate-200" />
            <div className="h-3 w-56 rounded bg-slate-100" />
          </div>
        </div>
        <div className="h-7 w-24 rounded-full bg-slate-200" />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="h-3 rounded bg-slate-100" />
        <div className="h-3 rounded bg-slate-100" />
        <div className="h-3 rounded bg-slate-100" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <div className="h-7 w-20 rounded-full bg-slate-100" />
        <div className="h-7 w-24 rounded-full bg-slate-100" />
        <div className="h-7 w-16 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}
