import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="py-8">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Meet Kawtar
          <span
            className="text-4xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h1>
        <p className="mb-3">
          A talented Software Engineer with multiple skills!
        </p>
      </div>
      <div className="lg:mx-16">
        <h2 className="text-2xl font-bold mb-4">
          About Me
          <span
            className="text-2xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h2>
        <p className="mb-4">
          Hey! I'm <span className="font-bold">Kawtar CHOUBARI</span>, a
          Software Engineer and Content Creator from Morocco, currently living
          in Paris, France.
        </p>
        <p className="mb-4">
          I mainly work on Front-End development on a daily basis, with
          JavaScript / TypeScript and frameworks like ReactJS, Next.js, and also
          React Native. I'm currently looking into learning Back-End JS
          development with NodeJS and NestJS.
        </p>
        <p className="mb-4">
          I have been able to put my knowledge in good use by giving back to the
          community: volunteering on organizing tech events, creating
          educational content on{" "}
          <a
            href="creator"
            className="hover-accent"
            style={{ color: "var(--color-accent)" }}
          >
            social media
          </a>
          , sharing{" "}
          <a
            href="oss"
            className="hover-accent"
            style={{ color: "var(--color-accent)" }}
          >
            open source
          </a>{" "}
          projects and actively delivering{" "}
          <Link
            href="/talks"
            className="hover-accent"
            style={{ color: "var(--color-accent)" }}
          >
            workshops & conferences
          </Link>
          .
        </p>
        <p className="mb-4">
          When I don't code, I'm usually planning and working on my next piece
          of content, playing on{" "}
          <a
            href="https://www.chess.com/member/choubari"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-accent"
            style={{ color: "var(--color-accent)" }}
          >
            chess.com
          </a>{" "}
          (just started btw), or taking care of my brand-new balcony garden.
        </p>
        <h2 className="text-2xl font-bold mt-12 mb-4">
          What can I help you with
          <span
            className="text-2xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            ?
          </span>
        </h2>
        <ul className="list-disc ml-4">
          <li>Software Development</li>
          <li>Public Speaking</li>
          <li>Content Creation</li>
          <li>Community Building</li>
          <li>Partnership & Collaboration</li>
          <li>Student life, Career Advice</li>
          <li>...</li>
        </ul>
        <h2 className="text-2xl font-bold mt-12 mb-4">
          Follow Me on Socials
          <span
            className="text-2xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h2>
        <p>
          You will find me on major social media platforms under the username
          @choubari, or @choubari_ if the first one is taken.
        </p>
        <h2 className="text-2xl font-bold mt-12 mb-6">
          Let
          <span
            className="text-2xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            '
          </span>
          s build something cool together
          <span
            className="text-2xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            !
          </span>
        </h2>
        <div className="mt-6">
          <Link href="/contact">
            <Button className="bg-blue-400 hover:bg-blue-500 text-white rounded-full text-lg px-6 py-3 h-auto">
              Let&apos;s CHAT!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
