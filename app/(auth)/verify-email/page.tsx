import { Card } from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <main className="container-width py-16">
      <Card className="mx-auto max-w-xl">
        <h1 className="text-2xl font-semibold">Verify your email</h1>
        <p className="mt-3 text-sm text-muted">
          Email verification placeholder for MVP. Replace this page with a tokenized verification flow backed by your transactional email provider.
        </p>
      </Card>
    </main>
  );
}
