import { MetadataRoute } from "next";
import { getAllPostsMetadata } from "@/lib/getAllPostsMetadata";

const home = process.env.NEXT_PUBLIC_APP_URL;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const allPosts = await getAllPostsMetadata();
  const disallowedPosts = allPosts
    .filter((post) => !post.published)
    .map((post) => `/blog/${post.slug}`);

  const disallowedPaths = [...disallowedPosts, "/api/contact"];

  return {
    sitemap: `${home}/sitemap.xml`,
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disallowedPaths,
    },
  };
}
