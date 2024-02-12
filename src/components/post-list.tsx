"use client";

import Link from "next/link";

type PostListProps = {
  posts: {
    title: string;
    slug: string;
    abstract: string;
  }[];
  titleAs?: "h1" | "h2" | "h3" | "h4";
};

export default function PostList({
  posts,
  titleAs: Tag = "h3",
}: PostListProps) {
  return (
    <ul className="grid gap-4">
      {posts.map((post) => (
        <li key={post.slug}>
          <Tag>
            <Link href={post.slug} className="font-semibold">
              {post.title}
            </Link>
          </Tag>
        </li>
      ))}
    </ul>
  );
}
