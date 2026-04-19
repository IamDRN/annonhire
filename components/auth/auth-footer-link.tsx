import Link from "next/link";

export function AuthFooterLink({
  prompt,
  href,
  label
}: {
  prompt: string;
  href: string;
  label: string;
}) {
  return (
    <p className="text-sm text-slate-600 dark:text-slate-300">
      {prompt}{" "}
      <Link href={href} className="font-semibold text-primary transition-colors hover:text-sky-500">
        {label}
      </Link>
    </p>
  );
}
