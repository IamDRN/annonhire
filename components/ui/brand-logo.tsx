import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({
  href = "/",
  className,
  imageClassName,
  priority = false,
  linked = true
}: {
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  linked?: boolean;
}) {
  const image = (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/anonhire-logo-clean.png"
        alt="AnonHire"
        width={519}
        height={194}
        priority={priority}
        className={cn("h-10 w-auto object-contain object-left sm:h-12", imageClassName)}
      />
    </span>
  );

  if (!linked) {
    return image;
  }

  return (
    <Link href={href} className="inline-flex items-center" aria-label="AnonHire home">
      {image}
    </Link>
  );
}
