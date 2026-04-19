import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { resumeUploadSchema } from "@/lib/validations";
import { parseResumeMock } from "@/services/resume-parser";

const FIVE_MB = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const payload = resumeUploadSchema.safeParse({
    fileName: file.name,
    mimeType: file.type
  });

  if (!payload.success || file.size > FIVE_MB) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  let fileUrl = `/uploads/${safeName}`;

  try {
    // Keep this path statically scoped so Next/Vercel tracing does not accidentally include the whole project.
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const targetPath = path.join(uploadDir, safeName);
    await writeFile(targetPath, buffer);
  } catch {
    // Replace this with object storage in production. The mock parser flow should still work
    // even if the runtime filesystem is ephemeral, such as on Vercel.
    fileUrl = `mock-storage://${safeName}`;
  }

  const parsed = await parseResumeMock({ fileName: file.name });
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const candidate = await prisma.candidateProfile.findUnique({
      where: { userId: session.user.id }
    });

    if (candidate) {
      await prisma.resume.upsert({
        where: { candidateProfileId: candidate.id },
        update: {
          fileName: file.name,
          fileUrl,
          mimeType: file.type,
          parsedAt: new Date()
        },
        create: {
          candidateProfileId: candidate.id,
          fileName: file.name,
          fileUrl,
          mimeType: file.type,
          parsedAt: new Date()
        }
      });
    }
  }

  return NextResponse.json({
    fileUrl,
    parsed
  });
}
