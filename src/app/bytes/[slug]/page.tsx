import Article from "@/components/article";
import { getBlogPost } from "@/helpers/file-helpers";

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
  const post = await getBlogPost("bytes/" + params.slug);

  console.log({ post });

  return (
    <Article
      content={post.content}
      type="byte"
      title={post.title}
      date={post.date}
    />
  );
}
