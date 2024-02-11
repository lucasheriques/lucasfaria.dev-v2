import React from "react";
import { getBlogPost } from "@/helpers/file-helpers";
import { Suspense } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeSnippet from "@/components/code-snippet";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  return {
    title: post.title,
    description: post.abstract,
  };
}

export default async function Idea({ params }: any) {
  const post = await getBlogPost(params.slug as string);

  return (
    <article className="prose dark:prose-invert text-xl font-serif">
      <MDXRemote
        source={post.content}
        components={{
          pre: (props) => <CodeSnippet {...props} />,
        }}
      />
    </article>
  );
}
