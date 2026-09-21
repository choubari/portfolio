import Link from "next/link";
import Image from "next/image";
import { PageTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";

export default function AboutPage() {
  return (
    <div className="py-14 sm:py-20">
      <div className="flex items-start justify-between gap-8">
        <PageTitle comment="about" mark="about" lede="Engineering, Educating, Entertaining.">
          Meet Kawtar
        </PageTitle>
        <Image
          src="/kawtar.png"
          alt="Kawtar Choubari"
          width={112}
          height={112}
          className="hidden h-28 w-28 shrink-0 rounded-full sm:block"
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
            , and build things in the open — see{" "}
            <Link href="/work" className="link">
              my work
            </Link>
            .
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

    </div>
  );
}
