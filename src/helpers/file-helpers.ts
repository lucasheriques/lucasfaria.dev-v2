import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";
import "server-only";

type PossibleHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

// extract table of contents based on headings
// ignore everything that is betweeen ```
export function extractTableOfContents(content: string) {
  const headings = content.match(/(?<=^|\n)#{1,6} .*(?=\n|$)/g);
  if (!headings) {
    return [];
  }
  return headings.map((heading) => {
    const headingLevel = heading.match(/#/g)?.length;
    const title = heading.replace(/#/g, "").trim();
    const id = title
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");
    return {
      level: headingLevel as PossibleHeadingLevel,
      title,
      id,
    };
  });
}

export function getPostInfoFromData(
  fileContents: string,
  slug: string,
  type: "ideas" | "bytes",
  needContent?: boolean,
) {
  const { data: frontmatter, content } = matter(fileContents);
  return {
    slug: `/${type}/${slug}`,
    title: frontmatter.title,
    abstract: frontmatter.abstract,
    date: frontmatter.date,
    language: frontmatter.language,
    tags: frontmatter.tags,
    headings: extractTableOfContents(fileContents),
    ...(needContent && { content }),
  };
}

export async function getBlogPostList() {
  const directory = path.join(process.cwd(), "content/ideas");
  const files = await fs.readdir(directory);
  const blogPosts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      const fileContents = await fs.readFile(filePath, "utf8");
      return getPostInfoFromData(
        fileContents,
        file.replace(/\.mdx$/, ""),
        "ideas",
      );
    }),
  );

  // Sort the blog posts by the published date in descending order
  blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return blogPosts;
}

// Function to read only the last 3 blog posts
export async function getLastXBlogPosts(amount: number = 3) {
  const blogPosts = await getBlogPostList();
  return blogPosts.slice(0, amount);
}

export async function getBytesList() {
  const directory = path.join(process.cwd(), "content/bytes");
  const files = await fs.readdir(directory);
  const bytePosts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      const fileContents = await fs.readFile(filePath, "utf8");
      return getPostInfoFromData(
        fileContents,
        file.replace(/\.mdx$/, ""),
        "bytes",
      );
    }),
  );

  // Sort the byte posts by the published date in descending order
  bytePosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return bytePosts;
}

export async function getLastXBytePosts(amount: number = 3) {
  const bytePosts = await getBytesList();
  return bytePosts.slice(0, amount);
}

// Function to load a blog post from /content/ideas that gets the slug as argument
async function _getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), `content/${slug}.mdx`);
  const fileContents = await fs.readFile(filePath, "utf8");
  return getPostInfoFromData(fileContents, slug, "ideas", true);
}

export const getBlogPost = cache(_getBlogPost);
