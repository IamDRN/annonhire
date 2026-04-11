import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { authOptions } from "@/lib/auth/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const employer = await prisma.employerProfile.findUnique({
    where: { userId: session.user.id },
    include: { sentRequests: true }
  });

  if (employer) {
    return NextResponse.json({ results: employer.sentRequests });
  }

  const candidate = await prisma.candidateProfile.findUnique({
    where: { userId: session.user.id },
    include: { receivedRequests: true }
  });

  return NextResponse.json({ results: candidate?.receivedRequests ?? [] });
}
