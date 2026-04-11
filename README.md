# AnonHire

AnonHire is a privacy-first job portal built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, NextAuth credentials auth, Zod validation, React Hook Form-ready patterns, and a search abstraction that can evolve from Prisma queries to OpenSearch later.

## What’s Included

- Anonymous candidate onboarding with resume upload and mocked parsing flow
- Employer registration with company onboarding and verification states
- Candidate dashboard with resume review, privacy controls, request inbox, and notifications
- Employer dashboard with candidate search, request tracking, and company overview
- Admin dashboard with verification queue, moderation placeholders, audit logs, and settings placeholders
- Prisma schema with candidate, employer, request, privacy, notification, and audit models
- Seed script with 6 sample candidates, 2 verified employers, and 1 admin

## Folder Structure

```text
app/
components/
lib/
actions/
services/
hooks/
types/
prisma/
public/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with your PostgreSQL connection string and secure auth secret.

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Run your first migration:

```bash
npm run prisma:migrate
```

6. Seed the database:

```bash
npm run db:seed
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sample Seed Credentials

- Admin: `admin@anonhire.dev` / `Password123!`
- Employer: `recruiter@northridge.example` / `Password123!`
- Employer: `hiring@summitcloud.example` / `Password123!`
- Candidate: `candidate1@anonhire.dev` / `Password123!`

## Production Replacement Points

- Replace `services/resume-parser.ts` with your real OCR / resume parsing pipeline.
- Replace local resume storage in [`app/api/resume/upload/route.ts`](/E:/Personal/Projects/HIREME/app/api/resume/upload/route.ts) with object storage such as S3 or UploadThing.
- Replace forgot-password and email verification placeholders with transactional email flows.
- Add a proper rate limiter around auth, upload, and request endpoints.
- Extend `lib/search/search-engine.ts` with an OpenSearch-backed provider when search volume grows.

## Future Enhancements

- Real-time secure employer-candidate messaging
- Subscription billing and recruiter seat management
- Saved search alerts and digest notifications
- AI-assisted candidate ranking and resume enrichment
- Document verification workflows for employer onboarding
- Advanced moderation, abuse reporting, and compliance tooling

## Notes

- `CONTACT_REVEAL_MODE` controls whether approval opens messaging only or can reveal contact details.
- Candidate PII stays hidden from search results and anonymous profile pages by default.
- The MVP uses server actions and route handlers with clear extension points for production hardening.
"# IamDRN" 
