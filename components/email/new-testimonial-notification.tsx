import React from "react";
import { TESTIMONIAL_CATEGORY } from "@/types/testimonial";

interface NewTestimonialNotificationEmailProps {
  submitterName: string;
  submitterEmail: string;
  position?: string | null;
  company?: string | null;
  sourceDetails: string;
  profileLink?: string | null;
  categories: Array<keyof typeof TESTIMONIAL_CATEGORY>;
  testimonialMessage: string;
  testimonialDate?: string;
  testimonialId?: string;
  documentId?: string;
}

export const NewTestimonialNotificationEmail: React.FC<
  Readonly<NewTestimonialNotificationEmailProps>
> = ({
  submitterName,
  submitterEmail,
  position,
  company,
  sourceDetails,
  profileLink,
  categories,
  testimonialMessage,
  testimonialDate,
  testimonialId,
  documentId,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  let publishUrl = null;

  if (documentId) {
    // Prioritize documentId
    publishUrl = `${baseUrl}/testimonials/admin/publish-draft?documentId=${encodeURIComponent(
      documentId
    )}`;
  } else if (testimonialId) {
    // Fallback to ID if no documentId
    publishUrl = `${baseUrl}/testimonials/admin/publish-draft?id=${encodeURIComponent(
      testimonialId
    )}`;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h1 style={{ color: "#333" }}>New Testimonial Submitted!</h1>
      <p>A new testimonial has been submitted on your website.</p>
      <hr style={{ border: "1px solid #eee", margin: "20px 0" }} />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "8px", fontWeight: "bold" }}>From:</td>
            <td style={{ padding: "8px" }}>{submitterName}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px", fontWeight: "bold" }}>Email:</td>
            <td style={{ padding: "8px" }}>{submitterEmail}</td>
          </tr>
          {position && (
            <tr>
              <td style={{ padding: "8px", fontWeight: "bold" }}>Position:</td>
              <td style={{ padding: "8px" }}>{position}</td>
            </tr>
          )}
          {company && (
            <tr>
              <td style={{ padding: "8px", fontWeight: "bold" }}>Company:</td>
              <td style={{ padding: "8px" }}>{company}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: "8px", fontWeight: "bold" }}>Source:</td>
            <td style={{ padding: "8px" }}>{sourceDetails}</td>
          </tr>
          {profileLink && (
            <tr>
              <td style={{ padding: "8px", fontWeight: "bold" }}>Profile:</td>
              <td style={{ padding: "8px" }}>
                <a href={profileLink} target="_blank" rel="noopener noreferrer">
                  {profileLink}
                </a>
              </td>
            </tr>
          )}
          <tr>
            <td style={{ padding: "8px", fontWeight: "bold" }}>Categories:</td>
            <td style={{ padding: "8px" }}>
              {categories.map((cat) => TESTIMONIAL_CATEGORY[cat]).join(", ")}
            </td>
          </tr>
          {testimonialDate && (
            <tr>
              <td style={{ padding: "8px", fontWeight: "bold" }}>
                Date submitted:
              </td>
              <td style={{ padding: "8px" }}>{testimonialDate}</td>
            </tr>
          )}
          {testimonialId && (
            <tr>
              <td style={{ padding: "8px", fontWeight: "bold" }}>ID:</td>
              <td style={{ padding: "8px" }}>{testimonialId}</td>
            </tr>
          )}
          {documentId && (
            <tr>
              <td style={{ padding: "8px", fontWeight: "bold" }}>
                Document ID:
              </td>
              <td style={{ padding: "8px" }}>{documentId}</td>
            </tr>
          )}
        </tbody>
      </table>

      <p style={{ fontWeight: "bold", marginTop: "20px" }}>Message:</p>
      <blockquote
        style={{
          borderLeft: "4px solid #ccc",
          paddingLeft: "1em",
          margin: "1em 0",
          backgroundColor: "#f9f9f9",
          padding: "15px",
        }}
      >
        <p>{testimonialMessage}</p>
      </blockquote>

      {publishUrl ? (
        <div style={{ margin: "30px 0", textAlign: "center" }}>
          <a
            href={publishUrl}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px 20px",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Authenticate & Publish This Testimonial
          </a>
          <p style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
            If the button doesn't work, copy and paste this URL: {publishUrl}
          </p>
        </div>
      ) : (
        <div
          style={{
            margin: "30px 0",
            textAlign: "center",
            color: "#721c24",
            backgroundColor: "#f8d7da",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <p>
            No identifiers available. Please publish directly through Strapi.
          </p>
        </div>
      )}

      <hr style={{ border: "1px solid #eee", margin: "20px 0" }} />
      <p>The testimonial has been saved as a draft in Strapi.</p>
      <p>
        You can also login to Strapi to review or make changes before
        publishing.
      </p>
      <p>Thank you!</p>
    </div>
  );
};
