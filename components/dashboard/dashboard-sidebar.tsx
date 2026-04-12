import * as React from "react";
import Link from "next/link";
import { Bell, BriefcaseBusiness, Building2, Home, Search, Settings, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarLink = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const candidateLinks: SidebarLink[] = [
  { href: "/candidate/dashboard", label: "Overview", icon: Home },
  { href: "/candidate/requests", label: "Employer Requests", icon: BriefcaseBusiness },
  { href: "/candidate/profile/demo", label: "Anonymous Profile", icon: Shield },
  { href: "/candidate/dashboard#privacy", label: "Privacy Controls", icon: Settings },
  { href: "/candidate/dashboard#notifications", label: "Notifications", icon: Bell }
];

const employerLinks: SidebarLink[] = [
  { href: "/employer/dashboard", label: "Overview", icon: Home },
  { href: "/employer/search", label: "Search Candidates", icon: Search },
  { href: "/employer/dashboard#requests", label: "Contact Requests", icon: BriefcaseBusiness },
  { href: "/employer/dashboard#company", label: "Company Profile", icon: Building2 }
];

const adminLinks: SidebarLink[] = [
  { href: "/admin/dashboard", label: "Admin Home", icon: Home },
  { href: "/admin/dashboard#approval", label: "Approval Queue", icon: Shield },
  { href: "/admin/dashboard#logs", label: "Audit Logs", icon: Bell }
];

export function DashboardSidebar({ role }: { role: "candidate" | "employer" | "admin" }) {
  const links = role === "candidate" ? candidateLinks : role === "employer" ? employerLinks : adminLinks;

  return (
    <aside className="glass-panel h-fit p-4">
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{role} portal</p>
      <div className="mt-2 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
