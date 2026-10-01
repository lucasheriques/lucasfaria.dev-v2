import A from "./A.astro";
import ArticleImage from "./ArticleImage.astro";
import DemoFallback from "./DemoFallback.astro";
import ExpandableContent from "./ExpandableContent.astro";
import FeedNote from "./FeedNote.astro";
import FeedVideo from "./FeedVideo.astro";
import TextPopover from "./TextPopover.astro";
import YoutubeEmbed from "./YoutubeEmbed.astro";

export const components = {
  a: A,
  ArticleImage,
  YoutubeEmbed,
  TextPopover,
  ExpandableContent,
  CodePlayground: DemoFallback,
  KubernetesVisualizer: DemoFallback,
};

// Feed readers and email digests drop popover and iframe, so the feed spells these out.
export const feedComponents = {
  ...components,
  TextPopover: FeedNote,
  YoutubeEmbed: FeedVideo,
};
