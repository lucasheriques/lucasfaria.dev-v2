import { cache } from "react";

import Article from "@/components/article";
import { getPostBySlug } from "@/use-cases/posts";

// Cache the post data to avoid fetching it twice on every page load
const cachedGetPostBySlug = cache(async (slug: string) => {
  return getPostBySlug(slug, "bytes");
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await cachedGetPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.abstract,
  };
}

export default async function Byte({ params }: { params: { slug: string } }) {
  const post = await cachedGetPostBySlug(params.slug);

  if (!post.content) {
    return;
  }

  return <Article {...post} content={post.content} />;
}
