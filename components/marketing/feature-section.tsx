import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const candidateSteps = [
  "Create an account and upload your resume.",
  "Review parsed data, set privacy controls, and publish anonymously.",
  "Approve only the employer requests you want to engage with."
];

const employerSteps = [
  "Register with your work email and complete company verification.",
  "Search anonymous profiles with deep skills and availability filters.",
  "Click HIRE ME to send a structured request and wait for consent."
];

export function FeatureSection() {
  return (
    <section id="how-it-works" className="container-width py-12 md:py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">How it works</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          Two tailored journeys built around trust, speed, and control.
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>For candidates</CardTitle>
              <CardDescription>Private by default, editable before publishing, and consent-based contact access.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {candidateSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Step {index + 1}</p>
                <p className="mt-2 text-sm text-slate-700">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>For employers</CardTitle>
              <CardDescription>Verified company identities, stronger search, and compliant outreach workflows.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {employerSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Step {index + 1}</p>
                <p className="mt-2 text-sm text-slate-700">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
