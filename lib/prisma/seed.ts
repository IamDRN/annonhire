import {
  EmployerVerificationStatus,
  NoticePeriod,
  PrismaClient,
  PrivacyCompanyMode,
  WorkMode
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const candidateFixtures = [
  {
    email: "candidate1@anonhire.dev",
    anonymousId: "ANON-1A92F",
    headline: "Senior Product Designer",
    summary: "Designs accessible B2B workflows with strong systems thinking and stakeholder alignment.",
    yearsOfExperience: 8,
    industryBackground: "SaaS",
    salaryExpectationMin: 90000,
    salaryExpectationMax: 120000,
    preferredLocation: "Northeast US",
    workMode: WorkMode.REMOTE,
    noticePeriod: NoticePeriod.ONE_MONTH,
    skills: ["Figma", "Design Systems", "Product Strategy", "UX Research"],
    experience: [{ title: "Lead Product Designer", companyName: "Northstar Labs", industry: "SaaS" }]
  },
  {
    email: "candidate2@anonhire.dev",
    anonymousId: "ANON-7K31Q",
    headline: "Backend Engineer",
    summary: "Builds resilient APIs, event-driven services, and developer tooling for high-growth teams.",
    yearsOfExperience: 6,
    industryBackground: "FinTech",
    salaryExpectationMin: 110000,
    salaryExpectationMax: 145000,
    preferredLocation: "Remote",
    workMode: WorkMode.REMOTE,
    noticePeriod: NoticePeriod.TWO_WEEKS,
    skills: ["TypeScript", "Node.js", "PostgreSQL", "Kafka"],
    experience: [{ title: "Senior Backend Engineer", companyName: "LedgerFlow", industry: "FinTech" }]
  },
  {
    email: "candidate3@anonhire.dev",
    anonymousId: "ANON-3P88M",
    headline: "Growth Marketing Manager",
    summary: "Leads lifecycle, paid acquisition, and experimentation programs with strong attribution discipline.",
    yearsOfExperience: 7,
    industryBackground: "E-commerce",
    salaryExpectationMin: 80000,
    salaryExpectationMax: 110000,
    preferredLocation: "West Coast",
    workMode: WorkMode.HYBRID,
    noticePeriod: NoticePeriod.ONE_MONTH,
    skills: ["Paid Search", "Lifecycle Marketing", "SEO", "Analytics"],
    experience: [{ title: "Growth Marketing Manager", companyName: "Cartwell", industry: "E-commerce" }]
  },
  {
    email: "candidate4@anonhire.dev",
    anonymousId: "ANON-5V61T",
    headline: "Data Analyst",
    summary: "Transforms messy business data into trustworthy dashboards and decision-ready insights.",
    yearsOfExperience: 4,
    industryBackground: "Healthcare",
    salaryExpectationMin: 70000,
    salaryExpectationMax: 92000,
    preferredLocation: "Midwest",
    workMode: WorkMode.FLEXIBLE,
    noticePeriod: NoticePeriod.IMMEDIATE,
    skills: ["SQL", "Python", "dbt", "Tableau"],
    experience: [{ title: "Analytics Specialist", companyName: "CarePulse", industry: "Healthcare" }]
  },
  {
    email: "candidate5@anonhire.dev",
    anonymousId: "ANON-4J20R",
    headline: "Full Stack Engineer",
    summary: "Ships polished product features across React, Next.js, and modern service backends.",
    yearsOfExperience: 5,
    industryBackground: "HR Tech",
    salaryExpectationMin: 105000,
    salaryExpectationMax: 135000,
    preferredLocation: "Remote",
    workMode: WorkMode.REMOTE,
    noticePeriod: NoticePeriod.ONE_MONTH,
    skills: ["Next.js", "React", "Prisma", "Tailwind CSS"],
    experience: [{ title: "Software Engineer", companyName: "TalentScope", industry: "HR Tech" }]
  },
  {
    email: "candidate6@anonhire.dev",
    anonymousId: "ANON-9N74L",
    headline: "Customer Success Lead",
    summary: "Owns strategic accounts, renewals, and executive relationship management for enterprise customers.",
    yearsOfExperience: 9,
    industryBackground: "Cybersecurity",
    salaryExpectationMin: 95000,
    salaryExpectationMax: 125000,
    preferredLocation: "Southeast",
    workMode: WorkMode.HYBRID,
    noticePeriod: NoticePeriod.TWO_WEEKS,
    skills: ["Enterprise CS", "Renewals", "Onboarding", "QBRs"],
    experience: [{ title: "Customer Success Lead", companyName: "ShieldGrid", industry: "Cybersecurity" }]
  }
];

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.savedSearch.deleteMany();
  await prisma.savedCandidate.deleteMany();
  await prisma.contactRequest.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.blockedEmployer.deleteMany();
  await prisma.privacySetting.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.education.deleteMany();
  await prisma.workExperience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.candidateProfile.deleteMany();
  await prisma.employerProfile.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Password123!", 10);

  const companyA = await prisma.company.create({
    data: { name: "North Ridge Talent", website: "https://northridge.example", domain: "northridge.example" }
  });
  const companyB = await prisma.company.create({
    data: { name: "Summit Cloud", website: "https://summitcloud.example", domain: "summitcloud.example" }
  });

  await prisma.user.create({
    data: { email: "admin@anonhire.dev", passwordHash, role: "ADMIN", emailVerified: new Date() }
  });

  await prisma.user.create({
    data: {
      email: "recruiter@northridge.example",
      passwordHash,
      role: "EMPLOYER",
      emailVerified: new Date(),
      employerProfile: {
        create: {
          fullName: "Avery Morgan",
          designation: "Talent Acquisition Lead",
          workEmail: "recruiter@northridge.example",
          verificationStatus: EmployerVerificationStatus.VERIFIED,
          website: "https://northridge.example",
          companyId: companyA.id
        }
      }
    }
  });

  await prisma.user.create({
    data: {
      email: "hiring@summitcloud.example",
      passwordHash,
      role: "EMPLOYER",
      emailVerified: new Date(),
      employerProfile: {
        create: {
          fullName: "Jordan Lee",
          designation: "VP People",
          workEmail: "hiring@summitcloud.example",
          verificationStatus: EmployerVerificationStatus.VERIFIED,
          website: "https://summitcloud.example",
          companyId: companyB.id
        }
      }
    }
  });

  for (const fixture of candidateFixtures) {
    await prisma.user.create({
      data: {
        email: fixture.email,
        passwordHash,
        role: "CANDIDATE",
        emailVerified: new Date(),
        candidateProfile: {
          create: {
            anonymousId: fixture.anonymousId,
            headline: fixture.headline,
            summary: fixture.summary,
            yearsOfExperience: fixture.yearsOfExperience,
            industryBackground: fixture.industryBackground,
            salaryExpectationMin: fixture.salaryExpectationMin,
            salaryExpectationMax: fixture.salaryExpectationMax,
            preferredLocation: fixture.preferredLocation,
            workMode: fixture.workMode,
            noticePeriod: fixture.noticePeriod,
            profileCompleteness: 88,
            skills: { create: fixture.skills.map((name) => ({ name })) },
            workExperience: {
              create: fixture.experience.map((item) => ({
                title: item.title,
                companyName: item.companyName,
                industry: item.industry,
                companyMode: PrivacyCompanyMode.MASKED
              }))
            },
            education: {
              create: {
                institution: "State University",
                degree: "Bachelor's Degree",
                fieldOfStudy: "Related Discipline",
                graduationYear: 2018
              }
            },
            certifications: {
              create: { name: "Professional Certificate", issuer: "Accredited Body", year: 2022 }
            },
            privacySetting: {
              create: {
                searchable: true,
                showExactCity: false,
                companyMode: PrivacyCompanyMode.MASKED,
                revealEducationInstitution: false,
                revealGraduationYear: false,
                allowMessagingOnly: true
              }
            },
            resume: {
              create: {
                fileName: "resume.pdf",
                fileUrl: "/uploads/mock-resume.pdf",
                mimeType: "application/pdf",
                parsedAt: new Date()
              }
            }
          }
        }
      }
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
