import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/section-title";
import { FeatureCard } from "@/components/feature-card";
import { Boxes, Wrench, Sparkles } from "lucide-react";

const SERVICES = [
  {
    icon: Boxes,
    title: "Product development",
    body: "From MVPs to SaaS, internal tools to mobile apps. I work with existing technologies or help choose the right stack for the project.",
  },
  {
    icon: Wrench,
    title: "Modernization and maintenance",
    body: "Legacy codebases, incomplete migrations, technical debt that needs an experienced hand.",
  },
  {
    icon: Sparkles,
    title: "AI-accelerated delivery",
    body: "I integrate AI tooling into existing workflows to reduce delivery time without cutting corners on code quality or architectural decisions.",
  },
];

export function WhatIDo() {
  return (
    <section className="pb-20">
      <Reveal>
        <SectionTitle>what I do</SectionTitle>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 70}>
            <FeatureCard icon={s.icon} title={s.title}>
              {s.body}
            </FeatureCard>
          </Reveal>
        ))}
      </div>

    </section>
  );
}
