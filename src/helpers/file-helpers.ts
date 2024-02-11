import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";
import "server-only";

export async function getBlogPostList() {
  const directory = path.join(process.cwd(), "content/ideas");
  const files = await fs.readdir(directory);
  const blogPosts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data: frontmatter } = matter(fileContents);
      return {
        slug: `/ideas/${file.replace(/\.mdx$/, "")}`,
        title: frontmatter.title,
        abstract: frontmatter.abstract,
        publishedOn: frontmatter.publishedOn,
      };
    }),
  );
  return blogPosts;
}

// Function to load a blog post from /content/ideas that gets the slug as argument
async function _getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), `content/ideas/${slug}.mdx`);
  const fileContents = await fs.readFile(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  return {
    title: frontmatter.title,
    abstract: frontmatter.abstract,
    publishedOn: frontmatter.publishedOn,
    content: content,
  };
}

export const getBlogPost = cache(_getBlogPost);
