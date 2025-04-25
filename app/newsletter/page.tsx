import NewsletterBox from "@/components/newsletter-box";
import { NEWSLETTER_FEED, getFeed } from "@/lib/rss";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

export default async function NewsletterPage() {
  const detailedFeed = await getFeed(NEWSLETTER_FEED.url);
  const items = detailedFeed.items;

  return (
    <div className="py-8">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          {NEWSLETTER_FEED.title}
          <span
            className="text-4xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h1>
        <p className="mb-3">
          The One Place to Learn, Laugh, and Level Up Your Coding Skills!
        </p>
        <div className="md:w-96 mt-5">
          <NewsletterBox type={"slim"} />
        </div>
      </div>

      <div className="lg:mx-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {items.map((item) => (
            <a
              key={item.link}
              className="border border-gray-800 rounded-lg p-5 bg-[#17191d] hover:border-[var(--color-accent)] transition-colors"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="font-bold text-xl mb-2">{item.title}</div>
              <p className="text-sm text-gray-400 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {format(new Date(item.isoDate || ""), "MMMM d, yyyy")}
                </span>
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
