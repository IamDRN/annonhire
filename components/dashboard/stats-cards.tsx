import { Card } from "@/components/ui/card";

export function StatsCards({ items }: { items: { label: string; value: string | number; hint: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="p-5">
          <p className="text-sm text-muted">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{item.value}</p>
          <p className="mt-2 text-sm text-slate-500">{item.hint}</p>
        </Card>
      ))}
    </div>
  );
}
