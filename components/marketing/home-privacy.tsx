import { BulletPoint, MarketingLinkButton, MarketingSection, PrivacyRow, SectionHeading } from "@/components/marketing/home-shared";

export function HomePrivacy() {
  return (
    <MarketingSection className="bg-white dark:bg-slate-950">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4">
            <PrivacyRow label="Full Name" value="Hidden" />
            <PrivacyRow label="Phone Number" value="Hidden" />
            <PrivacyRow label="Email Address" value="Hidden" />
            <PrivacyRow label="Current Employer" value="Masked" />
            <PrivacyRow label="Contact Access" value="Candidate Approval Required" />
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Privacy-first by design"
            title="Your identity stays hidden until you approve contact"
            description="This platform is built for confidential job discovery. Candidates stay in control while employers still get enough structured information to make smart hiring decisions."
            align="left"
          />

          <div className="mt-8 space-y-4">
            <BulletPoint text="Hide your name, email, phone, and exact employer" />
            <BulletPoint text="Block specific companies or employer domains" />
            <BulletPoint text="Choose messaging first or direct contact reveal after approval" />
            <BulletPoint text="Only verified employers can access the full candidate search experience" />
          </div>

          <div className="mt-8">
            <MarketingLinkButton href="/candidate/dashboard" variant="secondary">
              See Privacy Controls
            </MarketingLinkButton>
          </div>
        </div>
      </div>
    </MarketingSection>
  );
}
