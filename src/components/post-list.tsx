"use client";

import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import Badge from "./badge";

import { postLanguageAtom } from "@/helpers/atoms";
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
  const setPostLanguage = useSetAtom(postLanguageAtom);

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
            className="flex px-4 py-2 -ml-4 items-center hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors duration-300 gap-2"
            prefetch={true}
            onClick={() =>
              setPostLanguage(post.tags.includes("en") ? "en" : "pt-br")
            }
          >
            {post.language && <Badge>{post.language}</Badge>}
            {post.tags && <Badge>{post.tags}</Badge>}
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
