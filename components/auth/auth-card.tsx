import type React from "react";
import { cn } from "@/lib/utils";

export function AuthCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section
      className={cn(
        "rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_20px_80px_rgba(84,115,138,0.12)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/88 md:p-8",
        className
      )}
    >
      {children}
    </section>
  );
}
