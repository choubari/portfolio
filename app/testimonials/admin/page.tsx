"use client";

import { useSession, signIn } from "next-auth/react";
import TestimonialForm from "@/components/forms/admin-testimonial-form";

export default function NewTestimonialPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16)-2px)]">
        <h1 className="text-2xl font-semibold mb-4">Access Denied</h1>
        <p className="mb-6">You need to be signed in to access this page.</p>
        <button
          onClick={() => signIn("github")}
          className="px-6 py-2 bg-[var(--color-accent)] text-white rounded hover:bg-opacity-80 transition-colors"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  // If session exists and user is authenticated (and it's 'choubari' due to NextAuth callback)
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">New Testimonial</h1>
      {/* <p className="text-center mb-8">
        Protected Area for {session.user?.name}
      </p> */}
      <TestimonialForm />
    </div>
  );
}
