import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { canEmployerSearch, candidateSearchProvider } from "@/lib/search/search-engine";
import { searchFiltersSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allowed = await canEmployerSearch(session.user.id);
  if (!allowed) {
    return NextResponse.json({ error: "Verification required" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const filters = searchFiltersSchema.parse({
    keyword: searchParams.get("keyword") ?? undefined,
    industry: searchParams.get("industry") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    workMode: searchParams.get("workMode") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined
  });

  const results = await candidateSearchProvider.search(filters);
  return NextResponse.json({ results });
}
