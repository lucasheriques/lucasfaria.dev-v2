import { type CollectionEntry, getCollection } from "astro:content";

export const KINDS = {
  ideas: {
    title: "Essays",
    label: "essay",
    description:
      "Longer reflections on software engineering, product management, and personal growth.",
  },
  bytes: {
    title: "Bytes",
    label: "byte",
    description:
      "Brief notes on code, tools, and tips. Quick insights from my daily tech encounters.",
  },
} as const;

export type Kind = keyof typeof KINDS;
export type Post = CollectionEntry<Kind>;

export const kinds = Object.keys(KINDS) as Kind[];

export async function getPosts(only: Kind[] = kinds): Promise<Post[]> {
  const posts = (
    await Promise.all(only.map((kind) => getCollection(kind)))
  ).flat();
  return posts.sort(
    (a, b) => b.data.createdAt.valueOf() - a.data.createdAt.valueOf(),
  );
}

export const postPath = (post: Post) => `/${post.collection}/${post.id}`;

export const formatUtcDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = { dateStyle: "long" },
) => date.toLocaleDateString("en-US", { ...options, timeZone: "UTC" });
