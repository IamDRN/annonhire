import Link from "next/link";

const footerLinks = ["About", "Privacy", "Terms", "Contact", "Pricing", "Help"];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/70 py-10">
      <div className="container-width flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">AnonHire</p>
          <p className="mt-2 text-sm text-muted">Anonymous discovery with explicit candidate-controlled contact release.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          {footerLinks.map((link) => (
            <Link key={link} href="/">
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
