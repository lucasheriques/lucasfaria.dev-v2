import Article from "@/components/article";
import { getBlogPost } from "@/helpers/file-helpers";
import { getPostBySlug } from "@/use-cases/posts";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost("bytes/" + params.slug);

  return {
    title: post.title,
    description: post.abstract,
  };
}

export default async function Byte({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, "bytes");

  if (!post.content) {
    return;
  }

  return <Article {...post} content={post.content} />;
}
