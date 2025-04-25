import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-bold mb-6">
          <span style={{ color: "var(--color-accent)" }}>404</span>
        </h1>
        <h2 className="text-3xl font-bold mb-8">Page Not Found</h2>
        <p className="text-xl mb-8 text-gray-300">
          This page doesn't exist or was a sacrifice of shipping fast. <br />
          We're working on it and it might be available soon.
        </p>
        <Link href="/">
          <Button className="bg-blue-400 hover:bg-blue-500 text-white rounded-full text-lg px-6 py-3 h-auto">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
