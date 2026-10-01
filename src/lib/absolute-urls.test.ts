import { describe, expect, it } from "vitest";

import { absoluteUrls } from "./absolute-urls";

const site = new URL("https://lucasfaria.net");

describe("absoluteUrls", () => {
  it.each([
    [
      '<img src="/_astro/a.webp">',
      '<img src="https://lucasfaria.net/_astro/a.webp">',
    ],
    [
      '<a href="/bytes/take-breaks">',
      '<a href="https://lucasfaria.net/bytes/take-breaks">',
    ],
    [
      '<img srcset="/_astro/a.webp 628w, /_astro/b.webp 810w">',
      '<img srcset="https://lucasfaria.net/_astro/a.webp 628w, https://lucasfaria.net/_astro/b.webp 810w">',
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
