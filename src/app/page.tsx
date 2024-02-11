import { getBlogPostList } from "@/helpers/file-helpers";
import Link from "next/link";

export default async function Home() {
  const posts = await getBlogPostList();

  console.log({ posts });
  return (
    <div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link href={`${post.slug}`} key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.abstract}</p>
            <p>{post.publishedOn}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
