import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HomeFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 dark:border-t dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-10 flex flex-col gap-6 rounded-[1.8rem] border border-white/10 bg-white/5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <BrandLogo imageClassName="h-10 opacity-95" />
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              A privacy-first hiring platform for candidates who want control and employers who want better signal.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-white/10 px-3 py-1">Anonymous by default</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Verified employers</span>
          </div>
        </div>

        <div className="grid gap-12 py-10 md:grid-cols-4">
          <div />
          <FooterColumn
            title="Platform"
            links={[
              { label: "How It Works", href: "/#how-it-works" },
              { label: "Browse Talent", href: "/#browse-talent" },
              { label: "For Employers", href: "/#employers" },
              { label: "Pricing", href: "/#pricing" }
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "/" },
              { label: "Contact", href: "/" },
              { label: "Help Center", href: "/" },
              { label: "Careers", href: "/" }
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { label: "Privacy Policy", href: "/" },
              { label: "Terms of Service", href: "/" },
              { label: "Cookie Policy", href: "/" },
              { label: "Security", href: "/" }
            ]}
          />
        </div>

        <div className="border-t border-white/10 pt-6 text-xs text-slate-500">
          © 2026 AnonHire. Private career discovery for modern teams.
        </div>
      </div>
    </footer>
  );
}
