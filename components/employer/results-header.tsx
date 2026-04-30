import { SortDropdown } from "@/components/employer/sort-dropdown";

export function ResultsHeader({
  count,
  sortBy
}: {
  count: number;
  sortBy?: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900">{count} profiles found</p>
        <p className="mt-1 text-sm text-slate-500">Verified employer search results tailored to your current filters.</p>
      </div>
      <SortDropdown value={sortBy} />
    </div>
  );
}
