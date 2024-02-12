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
        date: frontmatter.date,
        language: frontmatter.language,
      };
    }),
  );

  // Sort the blog posts by the published date in descending order
  blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  console.log({ blogPosts });

  return blogPosts;
}

export async function getBytesList() {
  const directory = path.join(process.cwd(), "content/bytes");
  const files = await fs.readdir(directory);
  const bytePosts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data: frontmatter } = matter(fileContents);
      return {
        slug: `/bytes/${file.replace(/\.mdx$/, "")}`,
        title: frontmatter.title,
        abstract: frontmatter.abstract,
        date: frontmatter.date,
        language: frontmatter.language,
      };
    }),
  );

  // Sort the byte posts by the published date in descending order
  bytePosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return bytePosts;
}

// Function to load a blog post from /content/ideas that gets the slug as argument
async function _getBlogPost(slug: string) {
  console.log(`content/${slug}.mdx`);
  const filePath = path.join(process.cwd(), `content/${slug}.mdx`);
  const fileContents = await fs.readFile(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  return {
    title: frontmatter.title,
    abstract: frontmatter.abstract,
    date: frontmatter.date,
    content: content,
    language: frontmatter.language,
  };
}

export const getBlogPost = cache(_getBlogPost);
