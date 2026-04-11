import { EmployerVerificationStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { createNotification } from "@/services/notification-service";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as { employerProfileId: string; status: EmployerVerificationStatus };
  const employer = await prisma.employerProfile.update({
    where: { id: body.employerProfileId },
    data: { verificationStatus: body.status },
    include: { user: true }
  });

  await createNotification(
    employer.userId,
    "Employer verification updated",
    `Your verification status is now ${body.status.toLowerCase()}.`
  );

  return NextResponse.json({ employer });
}
