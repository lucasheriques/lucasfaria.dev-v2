import { getContainerRenderer } from "@astrojs/mdx/container-renderer";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { render } from "astro:content";

import { feedComponents } from "../components/mdx";
import { absoluteUrls } from "../lib/absolute-urls";
import { getPosts, postPath } from "../lib/posts";
import { SITE } from "../lib/site";

export async function GET({ site }: APIContext) {
  if (!site) throw new Error("rss.xml needs `site` in astro.config.mjs");
  const container = await AstroContainer.create({
    renderers: await loadRenderers([getContainerRenderer()]),
  });
  const posts = await getPosts();
  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const html = await container.renderToString(Content, {
        props: { components: feedComponents },
      });
      return {
        title: post.data.title,
        description: post.data.abstract,
        pubDate: post.data.createdAt,
        link: postPath(post),
        categories: post.data.tags,
        content: absoluteUrls(html, site),
      };
    }),
  );
  return rss({
    title: SITE.title,
    description: SITE.description,
    site,
    items,
    trailingSlash: false,
  });
}
