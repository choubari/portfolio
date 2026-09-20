import Link from "next/link";
import { BrandButton } from "@/components/brand-button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60svh] flex-1 flex-col justify-center py-16">
      <p className="comment">404</p>
      <h1 className="display mt-4">Page not found</h1>
      <p className="mt-5 max-w-xl leading-relaxed text-[var(--muted)]">
        This page doesn&apos;t exist or was a sacrifice of shipping fast.
      </p>
      <div className="mt-8">
        <Link href="/">
          <BrandButton>Back to home</BrandButton>
        </Link>
      </div>
    </div>
  );
}
