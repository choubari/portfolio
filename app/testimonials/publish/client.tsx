"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PublishTestimonialClientProps {
  adminUsername: string;
}

export default function PublishTestimonialClient({
  adminUsername,
}: PublishTestimonialClientProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    // Get documentId from URL
    const docId = searchParams.get("documentId");
    setDocumentId(docId);
  }, [searchParams]);

  // Handle publishing
  const handlePublish = async () => {
    if (!documentId) return;

    setIsPublishing(true);
    try {
      // We'll use client-side navigation to the server endpoint
      router.push(`/api/testimonials/publish?documentId=${documentId}`);
    } catch (error) {
      console.error("Error publishing testimonial:", error);
      setIsPublishing(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16)-2px)]">
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16)-2px)]">
        <h1 className="text-2xl font-semibold mb-4">Authentication Required</h1>
        <p className="mb-6">
          You need to be signed in to publish testimonials.
        </p>
        <button
          onClick={() => signIn("github")}
          className="px-6 py-2 bg-[var(--color-accent)] text-white rounded hover:bg-opacity-80 transition-colors"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  // Check if it's the authorized admin who's authenticated
  if ((session.user as any)?.login !== adminUsername) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16)-2px)]">
        <h1 className="text-2xl font-semibold mb-4">Access Denied</h1>
        <p className="mb-6">Only the site owner can publish testimonials.</p>
      </div>
    );
  }

  return (
    <div className="py-8 flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16)-2px)]">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Publish Testimonial
      </h1>

      {!documentId ? (
        <div className="text-center">
          <p className="mb-4">No testimonial ID provided.</p>
          <a
            href="/testimonials"
            className="px-6 py-2 bg-[var(--color-accent)] text-white rounded hover:bg-opacity-80 transition-colors inline-block"
          >
            Back to Testimonials
          </a>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-6">
            You're about to publish testimonial with ID:{" "}
            <strong>{documentId}</strong>
          </p>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-6 py-2 bg-[var(--color-accent)] text-white rounded hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPublishing ? "Publishing..." : "Publish This Testimonial"}
          </button>
        </div>
      )}
    </div>
  );
}
