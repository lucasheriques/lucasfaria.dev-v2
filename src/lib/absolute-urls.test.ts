import { describe, expect, it } from "vitest";

import { absoluteUrls } from "./absolute-urls";

const site = new URL("https://lucasfaria.dev");

describe("absoluteUrls", () => {
  it.each([
    [
      '<img src="/_astro/a.webp">',
      '<img src="https://lucasfaria.dev/_astro/a.webp">',
    ],
    [
      '<a href="/bytes/take-breaks">',
      '<a href="https://lucasfaria.dev/bytes/take-breaks">',
    ],
    [
      '<img srcset="/_astro/a.webp 628w, /_astro/b.webp 810w">',
      '<img srcset="https://lucasfaria.dev/_astro/a.webp 628w, https://lucasfaria.dev/_astro/b.webp 810w">',
    ],
    [
      '<img src="//cdn.example.com/x.png">',
      '<img src="//cdn.example.com/x.png">',
    ],
    [
      '<a href="https://x.com/onelucasfaria">',
      '<a href="https://x.com/onelucasfaria">',
    ],
    ['<a href="#project-requirements">', '<a href="#project-requirements">'],
  ])("%s", (html, expected) => {
    expect(absoluteUrls(html, site)).toBe(expected);
  });
});
