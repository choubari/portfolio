import Link from "next/link";
import { PageTitle, SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { FeatureCard } from "@/components/feature-card";
import { Compass, Lightbulb, Microscope, Gem, Layers, Bot } from "lucide-react";
import { fetchGithubRepos } from "@/lib/utils";
import { AsciiButton } from "@/components/ascii-button";

const HOW_I_WORK = [
  {
    icon: Compass,
    title: "Understand the business, not just the ticket",
    body: "I start with what the product and the business actually need, the deadline, the legacy system, the team's capacity. That context picks the architecture, not personal preference.",
  },
  {
    icon: Lightbulb,
    title: "Bring expertise beyond the code",
    body: "I don't just implement what's written in the spec, I weigh in on the decisions behind it, product and technical, because the right call often isn't a coding question.",
  },
  {
    icon: Microscope,
    title: "Solve the problem, not just the symptom",
    body: "Understanding why something breaks before deciding how to fix it, so the fix actually holds.",
  },
  {
    icon: Gem,
    title: "Craftsmanship, from pixel-perfect to strong infra",
    body: "The same care applies whether it's a UI detail or the infrastructure underneath, nothing gets the \u201cgood enough\u201d treatment.",
  },
  {
    icon: Layers,
    title: "Ship in slices",
    body: "Small, releasable increments over big-bang launches, so there's something working and reviewable early rather than a reveal at the end.",
  },
  {
    icon: Bot,
    title: "AI-assisted, agent-ready",
    body: "I use AI tooling throughout delivery, and I leave documentation and conventions structured so agents, and your team can pick up the codebase without me in the room.",
  },
];

export default async function AboutPage() {
  // Stars are summed live from the GitHub API rather than hardcoded.
  const repos = await fetchGithubRepos();
  const stars = repos.reduce((n, r) => n + r.stargazers_count, 0);
  return (
    <div className="py-14 sm:py-20">
      <PageTitle lede="Engineering, Educating, Entertaining.">
        Meet Kawtar
      </PageTitle>

      <section className="mt-12 max-w-2xl space-y-4 leading-relaxed text-[var(--muted)]">
        <Reveal>
          <p>
            Hey! I&apos;m{" "}
            <span className="font-semibold text-[var(--ink)]">
              Kawtar CHOUBARI
            </span>
            , a software engineer from Morocco, living in Paris. I specialise in
            the React ecosystem: JavaScript, TypeScript, React, Next.js,
            Node.js, and on mobile: React Native and Expo.
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
            , and build things in the open, see{" "}
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

      {/* How I work : anchor target for "See how I work" on /work */}
      <section id="how-i-work" className="mt-20 scroll-mt-24">
        <Reveal>
          <SectionTitle id="how-i-work-heading">how I work</SectionTitle>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_I_WORK.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <FeatureCard icon={item.icon} title={item.title}>
                {item.body}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </section>


      {/* Full-bleed brown block, same treatment as the homepage CTA */}
      <section className="bleed mt-24 bg-[var(--brown)] text-[var(--paper)]">
        <div className="mx-auto max-w-5xl px-[var(--edge)] py-16 sm:py-20">
          <Reveal>
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-[var(--paper-70)]">
              by the numbers
            </h2>
          </Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {[
              {
                value: stars ? stars.toLocaleString() : "750+",
                label: "GitHub stars",
              },
              { value: "430K+", label: "users on B2C apps" },
              { value: "12K+", label: "users on B2B apps" },
              { value: "6", label: "companies worked with" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
                  {stat.value}
                </dt>
                <dd className="mono mt-2 text-[var(--paper-70)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-20">
        <Reveal className="flex flex-col items-start gap-6">
          <h2 className="display max-w-2xl">
            Have something to build, or an existing product that needs
            attention?
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            I&apos;d like to hear about it.
          </p>
          <AsciiButton href="/contact" tone="accent">
            Tell me about your project
          </AsciiButton>
        </Reveal>
      </section>
    </div>
  );
}
