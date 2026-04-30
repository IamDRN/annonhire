"use client";

type FilterOption = {
  label: string;
  value: string;
  count: number;
};

export function FilterGroup({
  title,
  options,
  selectedValues,
  onToggle
}: {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="space-y-3">
        {options.map((option) => {
          const checked = selectedValues.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-slate-50"
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded border transition",
                    checked ? "border-[#6C63FF] bg-[#6C63FF]" : "border-slate-300 bg-white"
                  )}
                >
                  {checked ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                </span>
                <span className="text-[14px] text-slate-700">{option.label}</span>
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
