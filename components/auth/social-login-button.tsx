import type React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SocialLoginButton({
  icon,
  label,
  onClick,
  disabled,
  loading,
  variant = "primary",
  suffix
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
  suffix?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary"
          ? "border-sky-500 bg-primary px-4 py-3 text-white shadow-soft hover:-translate-y-0.5 hover:bg-sky-500"
          : "border-slate-200 bg-white px-4 py-3 text-slate-700 hover:border-sky-200 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-sky-900 dark:hover:bg-slate-900"
      )}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      <span>{label}</span>
      {suffix}
    </button>
  );
}
