"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import Badge from "./badge";

import { getPostInfoFromData } from "@/helpers/file-helpers";

type PostListProps = {
  posts: ReturnType<typeof getPostInfoFromData>[];
  titleAs?: "h1" | "h2" | "h3" | "h4";
};

export default function PostList({
  posts,
  titleAs: Tag = "h3",
}: PostListProps) {
  const [hoveredSlug, setHoveredSlug] = React.useState<string | null>(null);

  return (
    <ul className="grid">
      {posts.map((post) => (
        <li
          key={post.slug}
          onMouseEnter={() => setHoveredSlug(post.slug)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <Link
            href={post.slug}
            className="-ml-4 flex flex-col items-start gap-0 px-4 py-2 font-semibold transition-colors duration-300 hover:text-amber-700 md:flex-row md:items-center md:gap-2 dark:hover:text-amber-400"
            prefetch={true}
          >
            {post.language && <Badge>{post.language}</Badge>}
            <Tag className="">{post.title}</Tag>
            <motion.div
              aria-hidden
              animate={hoveredSlug === post.slug ? { x: 8, scale: 1.2 } : {}}
              className="hidden md:block"
            >
              <ArrowRight size={16} />
            </motion.div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
