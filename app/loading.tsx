import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalLoading() {
  return (
    <main className="container-width py-12">
      <div className="space-y-6">
        <Skeleton className="h-12 w-72" />
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-[420px] w-full" />
      </div>
    </main>
  );
}
