import { getBlogPostList } from "@/helpers/file-helpers";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const posts = await getBlogPostList();
  return (
    <div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link href={`${post.slug}`} prefetch={true} key={post.slug}>
            <h2 className="flex items-center gap-4">
              {post.title} <ArrowRight size={16} />
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
