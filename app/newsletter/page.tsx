import NewsletterBox from "@/components/newsletter-box";
import { NEWSLETTER_FEED, getFeed } from "@/lib/rss";
import { format } from "date-fns";
import { PageTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";

export default async function NewsletterPage() {
  const detailedFeed = await getFeed(NEWSLETTER_FEED.url);
  const items = detailedFeed.items;

  return (
    <div className="py-14 sm:py-20">
      <PageTitle
        comment="newsletter"
        lede="The One Place to Learn, Laugh, and Level Up Your Coding Skills!"
      >
        {NEWSLETTER_FEED.title}
      </PageTitle>

      <Reveal delay={150}>
        <div className="panel mt-8 max-w-md p-1">
          <NewsletterBox type="slim" />
        </div>
      </Reveal>

      <ul className="mt-12">
        {items.map((item, i) => (
          <Reveal as="li" key={item.link} delay={Math.min(i, 6) * 50}>
            <a
              className="row group grid grid-cols-1 gap-x-8 gap-y-1 py-5 sm:grid-cols-[9rem_1fr]"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mono pt-0.5">
                {item.isoDate ? format(new Date(item.isoDate), "MMM d, yyyy") : ""}
              </span>
              <h2 className="font-semibold transition-colors group-hover:text-[var(--action)]">
                {item.title}
              </h2>
            </a>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
