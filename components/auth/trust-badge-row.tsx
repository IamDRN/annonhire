import { LockKeyhole, ShieldCheck, UserRound } from "lucide-react";

const trustIcons = {
  secure: LockKeyhole,
  anonymous: UserRound,
  control: ShieldCheck
} as const;

export function TrustBadgeRow({
  items
}: {
  items: { label: string; icon: keyof typeof trustIcons }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = trustIcons[item.icon];

        return (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <Icon className="h-4 w-4 text-primary" />
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
