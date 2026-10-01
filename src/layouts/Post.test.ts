import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, it } from "vitest";

import Post from "./Post.astro";

it("links every table of contents entry to an element on the essay page", async () => {
  const container = await AstroContainer.create({
    astroConfig: { site: "https://lucasfaria.dev" },
  });
  const html = await container.renderToString(Post, {
    props: {
      post: {
        collection: "ideas",
        id: "an-essay",
        data: {
          title: "An essay",
          createdAt: new Date("2024-04-14"),
          tags: [],
        },
      },
      headings: [
        {
          depth: 2,
          slug: "project-requirements",
          text: "Project requirements",
        },
      ],
    },
    slots: {
      default: '<h2 id="project-requirements">Project requirements</h2>',
    },
  });
  const links = [...html.matchAll(/href="#([^"]+)"/g)].map(([, id]) => id);
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(([, id]) => id);

  expect(links).toEqual(["introduction", "project-requirements"]);
  expect(ids).toEqual(expect.arrayContaining(links));
});
