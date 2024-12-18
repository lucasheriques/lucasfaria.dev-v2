import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { cache } from "react";
import "server-only";

type PossibleHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

// extract table of contents based on headings
// ignore everything that is betweeen ```
export function extractTableOfContents(content: string) {
  const blocks = content.split("```");
  const headings = blocks
    .filter((_, index) => index % 2 === 0) // only consider blocks outside of code blocks
    .flatMap((block) => block.match(/(?<=^|\n)#{1,6} .*(?=\n|$)/g) || []); // match headings in each block

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
    slug: `${type}/${slug}`,
    title: frontmatter.title as string,
    abstract: frontmatter.abstract as string,
    createdAt: frontmatter.createdAt as string,
    updatedAt: frontmatter.updatedAt as string | undefined,
    language: frontmatter.language as string | undefined,
    tags: frontmatter.tags as string | undefined,
    type,
    headings: extractTableOfContents(fileContents),
    content: needContent ? content : undefined,
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
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return blogPosts;
}

// Function to read only the last 3 blog posts
async function _getLastXBlogPosts(amount: number = 3) {
  const blogPosts = await getBlogPostList();
  return blogPosts.slice(0, amount);
}

export const getLastXBlogPosts = cache(_getLastXBlogPosts);

async function _getBytesList() {
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
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return bytePosts;
}

export const getBytesList = cache(_getBytesList);

async function _getLastXBytePosts(amount: number = 3) {
  const bytePosts = await getBytesList();
  return bytePosts.slice(0, amount);
}

export const getLastXBytePosts = cache(_getLastXBytePosts);

// Function to load a blog post from /content/ideas that gets the slug as argument
async function _getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), `content/${slug}.mdx`);
  const fileContents = await fs.readFile(filePath, "utf8");
  return getPostInfoFromData(
    fileContents,
    slug,
    slug.includes("bytes/") ? "bytes" : "ideas",
    true,
  );
}

export const getBlogPost = cache(_getBlogPost);

export async function getAboutMe(lang: "en" | "pt-BR") {
  const fileName = lang === "en" ? "about-me.mdx" : "about-me-ptBR.mdx";
  const filePath = path.join(process.cwd(), `content/${fileName}`);
  const fileContents = await fs.readFile(filePath, "utf8");
  const { content } = matter(fileContents);

  return content;
}
