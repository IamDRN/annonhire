import Link from "next/link";
import { ShieldCheck } from "lucide-react";

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
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">AnonHire</p>
              <p className="text-xs text-slate-400">Privacy-first talent discovery</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            A secure talent platform where candidates stay anonymous until they choose to connect.
          </p>
        </div>

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
    </footer>
  );
}
