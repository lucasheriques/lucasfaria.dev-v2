import { describe, expect, it } from "vitest";

import { draft, post } from "./content.config";

describe("post frontmatter", () => {
  it.each([
    {
      shape: "unquoted date, which YAML hands over as a Date",
      schema: post,
      frontmatter: {
        title: "Take breaks",
        createdAt: new Date("2024-10-01"),
        tags: "productivity",
      },
      expected: {
        title: "Take breaks",
        createdAt: new Date("2024-10-01T00:00:00.000Z"),
        tags: ["productivity"],
      },
    },
    {
      shape: "quoted date string with an abstract",
      schema: post,
      frontmatter: {
        title: "Reward effort",
        abstract: "Embrace failure.",
        createdAt: "2024-02-25",
        tags: "career",
      },
      expected: {
        title: "Reward effort",
        abstract: "Embrace failure.",
        createdAt: new Date("2024-02-25T00:00:00.000Z"),
        tags: ["career"],
      },
    },
    {
      shape: "comma tags with stray spaces",
      schema: post,
      frontmatter: {
        title: "T",
        createdAt: "2024-01-01",
        tags: "software architecture, microservices,monolith, ",
      },
      expected: {
        title: "T",
        createdAt: new Date("2024-01-01T00:00:00.000Z"),
        tags: ["software architecture", "microservices", "monolith"],
      },
    },
    {
      shape: "draft without a date or tags",
      schema: draft,
      frontmatter: { title: "Notes on the Linear Sync Engine" },
      expected: { title: "Notes on the Linear Sync Engine", tags: [] },
    },
  ] as const)("parses $shape", ({ schema, frontmatter, expected }) => {
    expect(schema.parse(frontmatter)).toEqual(expected);
  });

  it.each([
    { name: "post", schema: post, createdAt: undefined },
    { name: "post", schema: post, createdAt: "2024-09-" },
    { name: "draft", schema: draft, createdAt: "2024-09-" },
  ] as const)(
    "rejects a $name with createdAt $createdAt",
    ({ schema, createdAt }) => {
      expect(schema.safeParse({ title: "T", createdAt }).success).toBe(false);
    },
  );
});
