import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <main className="container-width py-16">
      <Card className="mx-auto max-w-lg">
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <p className="mt-2 text-sm text-muted">Password reset placeholder. Replace with a secure token + email delivery flow.</p>
        <div className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
          <Button className="w-full">Send reset link</Button>
        </div>
      </Card>
    </main>
  );
}
