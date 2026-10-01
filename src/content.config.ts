import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

// z.coerce.date() alone accepts "2024-09-" through the lenient Date parser.
const date = z.union([z.date(), z.iso.date()]).pipe(z.coerce.date());

export const post = z.object({
  title: z.string(),
  abstract: z.string().optional(),
  createdAt: date,
  tags: z
    .string()
    .default("")
    .transform((tags) =>
      tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
});

export const draft = post.extend({
  createdAt: post.shape.createdAt.optional(),
});

const fromFolder = <S extends z.ZodType>(folder: string, schema: S) =>
  defineCollection({
    loader: glob({
      pattern: "*.mdx",
      base: `./content/${folder}`,
      generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
    }),
    schema,
  });

export const collections = {
  bytes: fromFolder("bytes", post),
  ideas: fromFolder("ideas", post),
  drafts: fromFolder("drafts", draft),
};
