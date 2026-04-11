import { Inbox } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="rounded-full bg-slate-100 p-4">
        <Inbox className="h-6 w-6 text-slate-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted">{description}</p>
    </div>
  );
}
