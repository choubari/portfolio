import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  purpose: string;
  message: string;
}

export function ContactEmailTemplate({
  fullName,
  purpose,
  message,
}: Readonly<EmailTemplateProps>): React.ReactElement {
  return (
    <div>
      <h1>Welcome, {fullName}!</h1>
      <p>
        We have successfully received your message about {purpose}:
        <br />
        <code>{message}</code>
        <br />
        we will be in touch soon!
      </p>
    </div>
  );
}
