import { getBlogPost } from "@/helpers/file-helpers";
import { Suspense } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Idea({ params }: any) {
  const post = await getBlogPost(params.slug as string);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="prose dark:prose-invert">
        <MDXRemote source={post.content} />
      </div>
    </Suspense>
  );
}
