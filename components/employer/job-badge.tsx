import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function JobBadge({
  children,
  variant = "default",
  className
}: {
  children: ReactNode;
  variant?: "default" | "purple" | "featured" | "success";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.02em]",
        variant === "purple" && "bg-[#EEF2FF] text-[#6C63FF]",
        variant === "featured" && "bg-[#6C63FF] text-white",
        variant === "success" && "bg-emerald-50 text-emerald-700",
        variant === "default" && "bg-slate-100 text-slate-600",
        className
      )}
    >
      {children}
    </span>
  );
}
