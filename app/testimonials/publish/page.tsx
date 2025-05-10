import PublishTestimonialClient from "./client";

export default function PublishTestimonialPage() {
  const adminUsername = process.env.GITHUB_ADMIN_USERNAME || "choubari";

  return <PublishTestimonialClient adminUsername={adminUsername} />;
}
