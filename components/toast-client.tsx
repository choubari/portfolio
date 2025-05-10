"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastClient() {
  useEffect(() => {
    // Really simple direct approach
    const query = new URLSearchParams(window.location.search);
    const success = query.get("success");
    const error = query.get("error");

    if (success) {
      // Generic success messages
      switch (success) {
        case "published":
          toast.success("Item published successfully!");
          break;
        case "already-published":
          toast.success("Item was already published!");
          break;
        case "saved":
          toast.success("Changes saved successfully!");
          break;
        case "deleted":
          toast.success("Item deleted successfully!");
          break;
        case "created":
          toast.success("Item created successfully!");
          break;
        default:
          toast.success(`Operation completed successfully!`);
          break;
      }
    }

    if (error) {
      // Generic error messages
      switch (error) {
        case "missing-id":
        case "missing-documentId":
          toast.error("Error: Missing identifier");
          break;
        case "find-failed":
          toast.error("Error: Failed to find item");
          break;
        case "testimonial-not-found":
        case "not-found":
          toast.error("Error: Item not found");
          break;
        case "update-failed":
          toast.error("Error: Failed to update item");
          break;
        case "publishing-failed":
          toast.error("Failed to publish item");
          break;
        case "server-error":
          toast.error("A server error occurred");
          break;
        case "unauthorized":
          toast.error("Unauthorized action");
          break;
        case "validation-failed":
          toast.error("Validation failed. Please check your input.");
          break;
        default:
          toast.error(`An error occurred: ${error}`);
          break;
      }
    }
  }, []);

  // Don't return a Toaster to avoid duplication with layout.tsx
  return null;
}
