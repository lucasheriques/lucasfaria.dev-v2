import Article from "@/components/article";
import { getBlogPost } from "@/helpers/file-helpers";
import { getPostBySlug } from "@/use-cases/posts";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost("ideas/" + params.slug);

  return {
    title: post.title,
    description: post.abstract,
  };
}

export default async function Idea({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, "ideas");

  if (!post.content) {
    return null;
  }

  return <Article {...post} content={post.content} />;
}
