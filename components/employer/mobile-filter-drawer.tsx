"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileFilterDrawer({
  children
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>
      <div className={cn("fixed inset-0 z-50 lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
        <div
          onClick={() => setOpen(false)}
          className={cn("absolute inset-0 bg-slate-950/30 transition", open ? "opacity-100" : "opacity-0")}
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[28px] bg-white p-5 shadow-2xl transition-transform",
            open ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-slate-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
