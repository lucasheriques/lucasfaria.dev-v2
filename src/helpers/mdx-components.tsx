import Link from "next/link";

import ArticleHeading from "@/components/article-heading";
import CodePlayground from "@/components/code-playground";
import CodeSnippet from "@/components/code-snippet";
import KubernetesVisualizer from "@/components/kubernetes-visualizer";
import ArticleImage from "@/components/ui/article-image";
import Button from "@/components/ui/button";
import ExpandableContent from "@/components/ui/expandable-content";
import TextPopover from "@/components/ui/text-popover";
import YoutubeEmbed from "@/components/youtube-embed";

const COMPONENT_MAP = {
  pre: CodeSnippet,
  a: (props: any) => <a {...props} target="_blank" />,
  h1: (props: any) => {
    return (
      <ArticleHeading title={props.children as string} as="h1" {...props} />
    );
  },
  h2: (props: any) => {
    return (
      <ArticleHeading title={props.children as string} as="h2" {...props} />
    );
  },
  h3: (props: any) => {
    return (
      <ArticleHeading title={props.children as string} as="h3" {...props} />
    );
  },
  h4: (props: any) => {
    return (
      <ArticleHeading title={props.children as string} as="h4" {...props} />
    );
  },
  h5: (props: any) => {
    return (
      <ArticleHeading title={props.children as string} as="h5" {...props} />
    );
  },
  h6: (props: any) => {
    return (
      <ArticleHeading title={props.children as string} as="h6" {...props} />
    );
  },
  IntroAnchor: (props: any) => (
    <ArticleHeading
      className="-mb-4 h-[1px]"
      title="introduction"
      as="h2"
      {...props}
    />
  ),
  CodePlayground: CodePlayground,
  Link: (props: any) => <Link target="_blank" {...props} />,
  TextPopover: TextPopover,
  ArticleImage: ArticleImage,
  KubernetesVisualizer: KubernetesVisualizer,
  Button: Button,
  ExpandableContent: ExpandableContent,
  YoutubeEmbed: YoutubeEmbed,
};

export default COMPONENT_MAP;
