import NewsletterBox from "@/components/newsletter-box";
import { NEWSLETTER_FEED, getFeed } from "@/lib/rss";
import { format } from "date-fns";
import { PageTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";

export default async function NewsletterPage() {
  const detailedFeed = await getFeed(NEWSLETTER_FEED.url);
  const items = detailedFeed.items;

  return (
    <div className="py-20 sm:py-28">
      <PageTitle
        eyebrow="00 / Newsletter"
        lede="The One Place to Learn, Laugh, and Level Up Your Coding Skills!"
      >
        {NEWSLETTER_FEED.title}
      </PageTitle>

      <Reveal delay={200}>
        <div className="mt-10 max-w-md">
          <NewsletterBox type="slim" />
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.link} delay={(i % 2) * 90}>
            <a
              className="card group flex h-full flex-col p-6"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="text-lg font-semibold transition-colors duration-500 ease-ease group-hover:text-[var(--gold)]">
                {item.title}
              </h2>
              <p className="label-mono mt-auto pt-5">
                {item.isoDate
                  ? format(new Date(item.isoDate), "MMMM d, yyyy")
                  : ""}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
