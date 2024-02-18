import Article from "@/components/article";
import { getBlogPost } from "@/helpers/file-helpers";

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
  const post = await getBlogPost("ideas/" + params.slug);

  if (!post.content) {
    return null;
  }

  return (
    <Article
      abstract={post.abstract}
      title={post.title}
      createdAt={post.createdAt}
      updatedAt={post.updatedAt}
      slug={post.slug}
      type={post.type}
      tags={post.tags}
      language={post.language}
      headings={post.headings}
      content={post.content}
    />
  );
}
