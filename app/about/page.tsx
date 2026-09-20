import Link from "next/link";
import Image from "next/image";
import { BrandButton } from "@/components/brand-button";
import { PageTitle, SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { WorkTimeline } from "@/components/work-timeline";
import { EducationHistory } from "@/config/experience";

export default function AboutPage() {
  return (
    <div className="py-14 sm:py-20">
      <div className="flex items-start justify-between gap-8">
        <PageTitle comment="about" lede="Engineering, Educating, Entertaining.">
          Meet Kawtar
        </PageTitle>
        <Image
          src="/kawtar.png"
          alt="Kawtar Choubari"
          width={96}
          height={96}
          className="hidden h-24 w-24 shrink-0 rounded-full sm:block"
        />
      </div>

      <section className="mt-12 max-w-2xl space-y-4 leading-relaxed text-[var(--muted)]">
        <Reveal>
          <p>
            Hey! I&apos;m{" "}
            <span className="font-semibold text-[var(--ink)]">
              Kawtar CHOUBARI
            </span>
            , a software engineer from Morocco, living in Paris. I specialise in
            the React ecosystem — JavaScript, TypeScript, React, Next.js,
            Node.js — and on mobile, React Native and Expo.
          </p>
        </Reveal>
        <Reveal delay={60}>
          <p>
            I&apos;ve delivered 10+ talks and workshops with organisers
            including O&apos;Reilly Media, Devoxx, BeJS and Reactjs Day, and was
            featured at Next.js Conf (2023) and React Conf (2024). I mentor
            students, create{" "}
            <Link href="/creator" className="link">
              educational content
            </Link>
            , and share{" "}
            <Link href="/oss" className="link">
              open source
            </Link>{" "}
            work.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p>
            When I don&apos;t code, I&apos;m planning my next piece of content,
            playing on{" "}
            <a
              href="https://www.chess.com/member/choubari"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              chess.com
            </a>
            , or taking care of my balcony garden.
          </p>
        </Reveal>
      </section>

      <section className="mt-16">
        <Reveal>
          <SectionTitle
            action={{ label: "LinkedIn", href: "https://linkedin.com/in/choubari" }}
          >
            experience
          </SectionTitle>
        </Reveal>
        <div className="mt-6">
          <WorkTimeline />
        </div>
      </section>

      <section className="mt-16">
        <Reveal>
          <SectionTitle>education</SectionTitle>
        </Reveal>
        <ul className="mt-6 border-t border-[var(--rule)]">
          {EducationHistory.map((item, i) => (
            <Reveal as="li" key={item.school} delay={i * 60}>
              <div className="row grid grid-cols-1 gap-x-8 gap-y-1 py-5 sm:grid-cols-[9rem_1fr]">
                <span className="mono pt-0.5">{item.period}</span>
                <div>
                  <h3 className="font-semibold">{item.school}</h3>
                  <p className="mt-1 text-[var(--muted)]">{item.degree}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <Reveal className="flex flex-col items-start gap-5">
          <SectionTitle className="w-full">get in touch</SectionTitle>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <BrandButton>Let&apos;s work together</BrandButton>
            </Link>
            <a href="mailto:contact@choubari.com?subject=Speaking%20invitation">
              <BrandButton tone="ghost">Invite me to speak</BrandButton>
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
