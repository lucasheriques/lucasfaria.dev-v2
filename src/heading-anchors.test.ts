import { satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri";
import { markdownToHtml } from "satteri";
import { describe, expect, it } from "vitest";

const idOf = async (markdown: string) =>
  (
    await markdownToHtml(markdown, { hastPlugins: [satteriHeadingIdsPlugin()] })
  ).html.match(/<h\d id="([^"]*)"/)?.[1];

describe("Astro's heading ids match the old site's anchors", () => {
  it.each([
    ["## Project requirements", "project-requirements"],
    [
      "## Improving local development velocity: Tilt",
      "improving-local-development-velocity-tilt",
    ],
    ["### API Endpoints", "api-endpoints"],
    ["## I get destroyed by Calculus 2", "i-get-destroyed-by-calculus-2"],
    [
      "## The differences between classes and real world engineering",
      "the-differences-between-classes-and-real-world-engineering",
    ],
    ["## TL;DR", "tldr"],
    ["## Editor set up", "editor-set-up"],
    ["### Go", "go"],
  ])("%s -> #%s", async (markdown, id) => {
    expect(await idOf(markdown)).toBe(id);
  });
});
