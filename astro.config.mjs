import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://lucasfaria.dev",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [mdx(), sitemap()],
  markdown: { shikiConfig: { theme: "material-theme-palenight" } },
  redirects: { "/links": "/" },
});
