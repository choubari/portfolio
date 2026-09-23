"use client";

import React from "react";
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  useTweet,
} from "react-tweet";

interface TweetProps {
  id: string;
}

// The Twitter syndication API sometimes returns a tweet without (or with a
// partial) `entities` object. react-tweet iterates over those arrays without
// guarding, which throws "entities is not iterable" while rendering on the
// client and takes the whole page down. Fill in the missing arrays first.
function normalizeEntities(tweet: any): any {
  if (!tweet || typeof tweet !== "object") return tweet;

  const entities = tweet.entities ?? {};

  return {
    ...tweet,
    entities: {
      ...entities,
      hashtags: entities.hashtags ?? [],
      user_mentions: entities.user_mentions ?? [],
      urls: entities.urls ?? [],
      symbols: entities.symbols ?? [],
    },
    display_text_range: tweet.display_text_range ?? [0, tweet.text?.length ?? 0],
    ...(tweet.quoted_tweet
      ? { quoted_tweet: normalizeEntities(tweet.quoted_tweet) }
      : {}),
    ...(tweet.parent ? { parent: normalizeEntities(tweet.parent) } : {}),
  };
}

class TweetErrorBoundary extends React.Component<
  { children: React.ReactNode; id: string },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <a
          href={`https://x.com/i/status/${this.props.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4"
        >
          View this post on X
        </a>
      );
    }
    return this.props.children;
  }
}

function TweetContent({ id }: TweetProps) {
  const { data, error, isLoading } = useTweet(id);

  if (isLoading) return <TweetSkeleton />;
  if (error || !data) return <TweetNotFound error={error} />;

  return <EmbeddedTweet tweet={normalizeEntities(data)} />;
}

export function ReactTweet({ id }: TweetProps) {
  return (
    <TweetErrorBoundary id={id}>
      <TweetContent id={id} />
    </TweetErrorBoundary>
  );
}
