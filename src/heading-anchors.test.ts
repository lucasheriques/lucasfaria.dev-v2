import type { MarkdownHeading } from "astro";
import { describe, expect, it } from "vitest";

const ideas = import.meta.glob<{ getHeadings: () => MarkdownHeading[] }>(
  "../content/ideas/*.mdx",
  { eager: true },
);

describe("idea headings keep the old site's anchors", () => {
  it.each([
    [
      "kubernetes-101-building-a-rest-api-with-go-part-1",
      [
        "project-requirements",
        "system-design",
        "api-endpoints",
        "implementation",
        "development-workflow",
        "setting-up-my-local-kubernetes-cluster",
        "improving-local-development-velocity-tilt",
        "wrapping-up",
      ],
    ],
    [
      "reward-effort-not-just-outcomes",
      [
        "my-childhood",
        "i-get-destroyed-by-calculus-2",
        "the-differences-between-classes-and-real-world-engineering",
        "some-final-recommendations",
      ],
    ],
    [
      "setting-up-my-macbook-for-development",
      [
        "tldr",
        "system-preferences",
        "daily-applications",
        "the-development-tools",
        "terminal-customization",
        "editor-set-up",
        "languages-set-up",
        "node",
        "go",
        "other-applications",
      ],
    ],
  ])("%s", (slug, anchors) => {
    const headings = ideas[`../content/ideas/${slug}.mdx`].getHeadings();
    expect(headings.map((heading) => heading.slug)).toEqual(
      expect.arrayContaining(anchors),
    );
  });
});
