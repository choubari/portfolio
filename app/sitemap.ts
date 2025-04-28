import { getAllPostsMetadata } from "@/lib/getAllPostsMetadata";

const home = process.env.NEXT_PUBLIC_APP_URL;

export default async function sitemap() {
  const allPosts = await getAllPostsMetadata();
  const dynamicRoutes = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${home}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
    }));

  const staticRoutes = [
    "",
    "/",
    "about",
    "work",
    "talks",
    "blog",
    "contact",
    "testimonials",
    "oss",
    "creator",
    "newsletter",
  ].map((route) => ({
    url: `${home}/${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...dynamicRoutes, ...staticRoutes];
}

