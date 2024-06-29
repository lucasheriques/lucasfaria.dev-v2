import { getPost } from "@/data-access/posts";

type PossibleHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

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

function getPostInfoFromData(
  frontmatter: Record<string, any>,
  content: string,
  slug: string,
  type: "ideas" | "bytes",
  needContent?: boolean,
) {
  return {
    slug: `${type}/${slug}`,
    title: frontmatter.title as string,
    abstract: frontmatter.abstract as string,
    createdAt: frontmatter.createdAt as string,
    updatedAt: frontmatter.updatedAt as string | undefined,
    language: frontmatter.language as string | undefined,
    tags: frontmatter.tags as string | undefined,
    type,
    headings: extractTableOfContents(content),
    content: needContent ? content : undefined,
  };
}

export async function getPostBySlug(slug: string, type: "ideas" | "bytes") {
  const { content, data: frontmatter } = await getPost(slug, type);

  return getPostInfoFromData(frontmatter, content, slug, type, true);
}
