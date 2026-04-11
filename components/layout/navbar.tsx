import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur">
      <div className="container-width flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary p-2 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold tracking-tight">AnonHire</p>
            <p className="text-xs text-muted">Privacy-first talent marketplace</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/employer/search">Search talent</Link>
          <Link href="/candidate/profile/demo">Anonymous profile</Link>
          <Link href="/#privacy">Privacy</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/candidate/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/candidate/signup">
            <Button>Upload Resume</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
