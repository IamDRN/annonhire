import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { canEmployerSearch, searchEmployerCandidates } from "@/lib/search/search-engine";
import { searchFiltersSchema } from "@/lib/validations";
import { WorkMode } from "@prisma/client";

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
    skills: searchParams.get("skills")?.split(",").map((item) => item.trim()).filter(Boolean) ?? undefined,
    yearsMin: searchParams.get("yearsMin") ?? undefined,
    yearsMax: searchParams.get("yearsMax") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    salaryMin: searchParams.get("salaryMin") ?? undefined,
    salaryMax: searchParams.get("salaryMax") ?? undefined,
    noticePeriod: searchParams.get("noticePeriod") ?? undefined,
    workMode: searchParams.get("workMode") ?? undefined,
    workModes:
      searchParams
        .get("workModes")
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean) as WorkMode[] | undefined,
    experienceLevels:
      searchParams
        .get("experienceLevels")
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean) as ("entry" | "mid" | "senior" | "manager" | "director")[] | undefined,
    categories:
      searchParams
        .get("categories")
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean) as ("HR" | "Finance" | "IT" | "Sales" | "Marketing" | "Operations" | "Customer Service")[] | undefined,
    education: searchParams.get("education") ?? undefined,
    profileCompleteness: searchParams.get("profileCompleteness") ?? undefined,
    availability: searchParams.get("availability") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined
  });

  const { results, employerProfileId } = await searchEmployerCandidates(session.user.id, filters);

  return NextResponse.json({
    employerProfileId,
    results
  });
}
