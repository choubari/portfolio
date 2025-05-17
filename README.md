# Personal Portfolio

Personal portfolio website and blog built with Next.js, featuring my talks, a blog, testimonials, open-source contributions, and more.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Blog:** [next/mdx](https://nextjs.org/docs/pages/guides/mdx)
- **CMS:** [Strapi](https://strapi.io/) for storing and collecting testimonials
- **Email:** [Resend](https://resend.com/) for sending emails and contact form
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (for direct admin testimonial submissions)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    cd YOUR_REPOSITORY_NAME
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file by copying the example file:

    ```sh
    cp .env.example .env.local
    ```

    Update `.env.local` with your actual API keys and configuration details (e.g., Strapi URL, API token, GitHub OAuth credentials, NextAuth secret).

4.  **Run the development server:**
    ```sh
    npm run dev
    # or
    # yarn dev
    # or
    # pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project is organized within the `/app` directory, following Next.js App Router conventions. Key sections include:

- `/app/api`: API routes, including authentication.
- `/app/blog`: Blog section.
- `/app/testimonials`: Testimonials management and display.
- `/app/talks`: Information about talks.
- `/app/oss`: Open-source contributions.
- `/app/contact`: Contact page.
- ... and other pages/sections like `about`, `creator`, `newsletter`.
