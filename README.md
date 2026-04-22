# AnonHire

AnonHire is a privacy-first talent marketplace built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Auth.js / NextAuth. Candidates stay anonymous until they approve contact, while employers search structured profiles and send compliant HIRE ME requests.

## Current MVP Scope

- Candidate email/password authentication
- Candidate Google login
- Employer email/password authentication
- Anonymous candidate onboarding with resume upload and mock parsing
- Candidate dashboard with privacy controls, onboarding guidance, requests, and notifications
- Employer dashboard with search, requests, and verification-aware access
- Admin dashboard placeholders for moderation and verification
- Candidate search with privacy-safe cards and request CTA flow

## Project Structure

```text
app/
components/
lib/
actions/
services/
types/
public/
```

Prisma schema and migrations live under:

```text
lib/prisma/
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXTAUTH_URL=
UPLOAD_DIR=
CONTACT_REVEAL_MODE=
RESEND_API_KEY=
EMAIL_FROM=
APP_URL=
```

Google callback URL:

```text
/api/auth/callback/google
```

Local example:

```text
http://localhost:3000/api/auth/callback/google
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run prisma:generate
```

3. Run migrations:

```bash
npm run prisma:migrate
```

4. Seed sample data:

```bash
npm run db:seed
```

5. Start development:

```bash
npm run dev
```

## Build

The production build runs Prisma generate automatically before `next build`:

```bash
npm run build
```

## Sample Credentials

- Admin: `admin@anonhire.dev` / `Password123!`
- Employer: `recruiter@northridge.example` / `Password123!`
- Employer: `hiring@summitcloud.example` / `Password123!`
- Candidate: `candidate1@anonhire.dev` / `Password123!`

## Production Notes

- Google login is enabled only when both `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` are set.
- In development, missing Google OAuth variables will not crash the app; candidate auth falls back to credentials.
- Resume file storage currently degrades gracefully when filesystem persistence is unavailable. Replace it with object storage such as UploadThing or S3 for production durability.
- Forgot password and email verification are still placeholders and should be replaced with transactional email flows.
- Transactional email notifications use Resend. Verify your sending domain and set `EMAIL_FROM` to a verified sender identity before enabling email in production.

## Transactional Email

AnonHire sends transactional emails for:

- New candidate signup
- New employer signup
- New employer contact request to a candidate
- Candidate approval of a contact request
- Candidate rejection of a contact request

Resend setup:

1. Create a Resend API key and store it in `RESEND_API_KEY`.
2. Verify your sending domain in Resend.
3. Set `EMAIL_FROM` to a verified sender, for example `AnonHire <notifications@your-domain.com>`.
4. Set `APP_URL` to your local or production app URL so dashboard links in emails resolve correctly.

If Resend is not configured, the core product flows still succeed and email delivery is skipped with server-side logging.

## Recommended Phase 2

- LinkedIn authentication
- Persistent object storage for resumes
- Real-time secure employer-candidate messaging
- Saved search alerts
- Billing and team seats
- Richer moderation and analytics
