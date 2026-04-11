import { NoticePeriod, WorkMode } from "@prisma/client";

type MockResumePayload = {
  fileName: string;
};

export async function parseResumeMock({ fileName }: MockResumePayload) {
  const inferredName = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

  // Replace this mock service with a production parser integration such as OCR + LLM extraction.
  return {
    fullName: inferredName
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    headline: "Full Stack Product Engineer",
    summary: "Experienced engineer focused on privacy-first web platforms, robust APIs, and polished product delivery.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    workExperience: [
      {
        title: "Senior Software Engineer",
        companyName: "Confidential Company",
        industry: "Technology",
        description: "Built full-stack customer products and internal systems."
      }
    ],
    education: [
      {
        institution: "Confidential University",
        degree: "Bachelor of Engineering",
        fieldOfStudy: "Computer Science",
        graduationYear: 2020
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        year: 2023
      }
    ],
    yearsOfExperience: 5,
    preferredLocation: "Remote",
    salaryExpectation: { min: 100000, max: 135000 },
    noticePeriod: NoticePeriod.ONE_MONTH,
    workMode: WorkMode.REMOTE
  };
}
