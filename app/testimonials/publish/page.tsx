import PublishTestimonialClient from "./client";
import { Suspense } from "react";

export default function PublishTestimonialPage() {
  const adminUsername = process.env.GITHUB_ADMIN_USERNAME || "choubari";

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <PublishTestimonialClient adminUsername={adminUsername} />
    </Suspense>
  );
}
