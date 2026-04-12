import * as React from "react";
import { Briefcase, Building2, Search, ShieldCheck, Star, Upload, UserCheck, Users } from "lucide-react";

export type Category = {
  title: string;
  count: string;
  icon: React.ReactNode;
};

export type ProfileCard = {
  id: string;
  title: string;
  experience: string;
  location: string;
  skills: string[];
  salary: string;
  notice: string;
};

export const categories: Category[] = [
  { title: "HR & Recruitment", count: "1,240+ profiles", icon: <Users className="h-5 w-5" /> },
  { title: "Accounting & Finance", count: "980+ profiles", icon: <Briefcase className="h-5 w-5" /> },
  { title: "Digital Marketing", count: "760+ profiles", icon: <Star className="h-5 w-5" /> },
  { title: "Banking & Insurance", count: "690+ profiles", icon: <Building2 className="h-5 w-5" /> },
  { title: "Sales & Business Development", count: "1,120+ profiles", icon: <UserCheck className="h-5 w-5" /> },
  { title: "IT & Software", count: "1,540+ profiles", icon: <Search className="h-5 w-5" /> }
];

export const featuredProfiles: ProfileCard[] = [
  {
    id: "#AH-2041",
    title: "Senior HR Officer",
    experience: "5 Years",
    location: "Kathmandu",
    skills: ["Recruitment", "Payroll", "Labor Law", "HRIS"],
    salary: "NPR 55K-75K",
    notice: "30 Days"
  },
  {
    id: "#AH-1182",
    title: "Digital Marketing Executive",
    experience: "3 Years",
    location: "Lalitpur",
    skills: ["SEO", "Meta Ads", "Content", "Analytics"],
    salary: "NPR 40K-60K",
    notice: "Immediate"
  },
  {
    id: "#AH-3307",
    title: "Account Officer",
    experience: "4 Years",
    location: "Bhaktapur",
    skills: ["Tally", "VAT", "Reporting", "Excel"],
    salary: "NPR 45K-65K",
    notice: "15 Days"
  }
];

export const candidateSteps = [
  {
    step: "01",
    title: "Upload Resume",
    description: "Upload PDF or DOCX and let the system extract your experience, skills, and profile summary.",
    icon: <Upload className="h-5 w-5" />
  },
  {
    step: "02",
    title: "Review & Set Privacy",
    description: "Edit your profile, choose what stays hidden, and control how employers can contact you.",
    icon: <ShieldCheck className="h-5 w-5" />
  },
  {
    step: "03",
    title: "Receive HIRE ME Requests",
    description: "Verified employers can request contact. You decide whether to accept, reject, or ask for more details.",
    icon: <Briefcase className="h-5 w-5" />
  }
];

export const employerSteps = [
  {
    step: "01",
    title: "Search by Skill",
    description: "Use filters like skill, experience, industry, location, salary range, and notice period.",
    icon: <Search className="h-5 w-5" />
  },
  {
    step: "02",
    title: "View Anonymous Profiles",
    description: "See candidate quality and fit without exposing personal information too early.",
    icon: <Users className="h-5 w-5" />
  },
  {
    step: "03",
    title: "Request Contact",
    description: "Click HIRE ME, send your message, and wait for candidate approval before contact is shared.",
    icon: <UserCheck className="h-5 w-5" />
  }
];

export const pricingTiers = [
  {
    title: "Candidate",
    price: "Free",
    features: ["Anonymous profile", "Resume upload", "Privacy controls", "Employer request inbox"],
    cta: "Get Started",
    featured: false,
    href: "/candidate/signup"
  },
  {
    title: "Employer Standard",
    price: "NPR / Monthly",
    features: ["Candidate search", "Basic filters", "Saved candidates", "Limited HIRE ME requests"],
    cta: "Start Hiring",
    featured: true,
    href: "/employer/signup"
  },
  {
    title: "Employer Premium",
    price: "Custom",
    features: ["Advanced filters", "Team seats", "Higher request volume", "Priority support"],
    cta: "Talk to Sales",
    featured: false,
    href: "/employer/signup"
  }
];
