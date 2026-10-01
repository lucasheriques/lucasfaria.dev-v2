import { getContainerRenderer } from "@astrojs/mdx/container-renderer";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { render } from "astro:content";

import { components } from "../components/mdx";
import { SITE, getPosts, postPath } from "../lib/posts";

export async function GET({ site }: APIContext) {
  const container = await AstroContainer.create({
    renderers: await loadRenderers([getContainerRenderer()]),
  });
  const posts = await getPosts();
  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const html = await container.renderToString(Content, {
        props: { components },
      });
      return {
        title: post.data.title,
        description: post.data.abstract,
        pubDate: post.data.createdAt,
        link: postPath(post),
        categories: post.data.tags,
        content: html.replace(/(src|href)="\//g, `$1="${site}`),
      };
    }),
  );
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: site!,
    items,
    trailingSlash: false,
  });
}
