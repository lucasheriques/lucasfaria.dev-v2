import A from "./A.astro";
import ArticleImage from "./ArticleImage.astro";
import DemoFallback from "./DemoFallback.astro";
import ExpandableContent from "./ExpandableContent.astro";
import IntroAnchor from "./IntroAnchor.astro";
import TextPopover from "./TextPopover.astro";
import YoutubeEmbed from "./YoutubeEmbed.astro";

export const components = {
  a: A,
  ArticleImage,
  YoutubeEmbed,
  IntroAnchor,
  TextPopover,
  ExpandableContent,
  CodePlayground: DemoFallback,
  KubernetesVisualizer: DemoFallback,
};
