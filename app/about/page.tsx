import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { PageTitle, SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";

const HELP_WITH = [
  "Software Development",
  "Public Speaking",
  "Content Creation",
  "Community Building",
  "Partnership & Collaboration",
  "Student life, Career Advice",
  "...",
];

export default function AboutPage() {
  return (
    <div className="py-20 sm:py-28">
      <PageTitle
        eyebrow="00 / About"
        lede="A talented Software Engineer with multiple skills!"
      >
        Meet Kawtar
      </PageTitle>

      <section className="mt-20 max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--muted)]">
        <Reveal>
          <p>
            Hey! I&apos;m{" "}
            <span className="font-semibold text-[var(--text)]">
              Kawtar CHOUBARI
            </span>
            , a Software Engineer and Content Creator from Morocco, currently
            living in Paris, France.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p>
            I mainly work on Front-End development on a daily basis, with
            JavaScript / TypeScript and frameworks like ReactJS, Next.js, and
            also React Native. I&apos;m currently looking into learning Back-End
            JS development with NodeJS and NestJS.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p>
            I have been able to put my knowledge in good use by giving back to
            the community: volunteering on organizing tech events, creating
            educational content on{" "}
            <Link href="/creator" className="link-underline">
              social media
            </Link>
            , sharing{" "}
            <Link href="/oss" className="link-underline">
              open source
            </Link>{" "}
            projects and actively delivering{" "}
            <Link href="/talks" className="link-underline">
              workshops &amp; conferences
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p>
            When I don&apos;t code, I&apos;m usually planning and working on my
            next piece of content, playing on{" "}
            <a
              href="https://www.chess.com/member/choubari"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              chess.com
            </a>{" "}
            (just started btw), or taking care of my brand-new balcony garden.
          </p>
        </Reveal>
      </section>

      <section className="mt-24 border-t border-[var(--rule)] pt-16">
        <Reveal>
          <SectionTitle index="01" kicker="Services" tick="?">
            What can I help you with
          </SectionTitle>
        </Reveal>
        <ul className="mt-10 max-w-2xl">
          {HELP_WITH.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 60}>
              <div className="flex items-baseline gap-5 border-b border-[var(--rule)] py-4">
                <span className="label-mono text-[var(--gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg">{item}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mt-24 border-t border-[var(--rule)] pt-16">
        <Reveal>
          <SectionTitle index="02" kicker="Elsewhere">
            Follow Me on Socials
          </SectionTitle>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            You will find me on major social media platforms under the username
            @choubari, or @choubari_ if the first one is taken.
          </p>
        </Reveal>
      </section>

      <section className="mt-24 border-t border-[var(--rule)] pt-16">
        <Reveal className="flex flex-col items-start gap-8">
          <SectionTitle index="03" kicker="Next" tick="!">
            Let&apos;s build something cool together
          </SectionTitle>
          <Link href="/contact">
            <BrandButton>Let&apos;s CHAT!</BrandButton>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
