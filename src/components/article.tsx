import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

import ArticleHeading from "@/components/article-heading";
import CodePlayground from "@/components/code-playground";
import CodeSnippet from "@/components/code-snippet";
import ResetHeading from "@/components/reset-heading";
import TableOfContents from "@/components/table-of-contents";
import { Title } from "@/components/typography";
import ArticleImage from "@/components/ui/article-image";
import IdeasProgressBar from "@/components/ui/ideas-progress-bar";
import TextPopover from "@/components/ui/text-popover";
import { type getPostInfoFromData } from "@/helpers/file-helpers";

type HeroProps = {
  title: string;
  humanizedDate: string;
  content: string; // Assuming this is the full article content for read time calculation
  type: "ideas" | "bytes";
};

const Hero = ({ title, humanizedDate, content, type }: HeroProps) => {
  // Calculate read time
  const wordsPerMinute = 200;
  const numberOfWords = content.split(/\s/g).length;
  const readTime = Math.ceil(numberOfWords / wordsPerMinute);

  return (
    <div className="not-prose">
      <Title as="h1" className="text-4xl font-bold">
        {title}
      </Title>
      <p className="mt-2 text-base dark:text-gray-50">
        {humanizedDate} {type === "ideas" && `· ${readTime} min read`}
      </p>
    </div>
  );
};

type ArticleProps = ReturnType<typeof getPostInfoFromData> & {
  content: string;
};

const Article = ({
  title,
  createdAt,
  content,
  type,
  headings,
  language,
}: ArticleProps) => {
  const humanizedDate = format(new Date(createdAt), "MMMM do, yyyy");

  if (!content) {
    return null;
  }
  return (
    <div className="xl:article-grid mx-auto grid max-w-3xl grid-cols-1 px-6 sm:gap-y-12 xl:max-w-full">
      <aside className="hidden xl:flex"></aside>
      <article className="prose max-w-full font-serif text-xl text-gray-950 dark:prose-invert xl:px-6 dark:text-gray-300">
        {type === "ideas" && <IdeasProgressBar />}
        <Hero
          type={type}
          title={title}
          humanizedDate={humanizedDate}
          content={content}
        />
        <MDXRemote
          source={content}
          components={{
            pre: (props) => <CodeSnippet {...props} />,
            a: (props) => <a {...props} target="_blank" />,
            h1: (props) => {
              return (
                <ArticleHeading
                  title={props.children as string}
                  as="h1"
                  {...props}
                />
              );
            },
            h2: (props) => {
              return (
                <ArticleHeading
                  title={props.children as string}
                  as="h2"
                  {...props}
                />
              );
            },
            h3: (props) => {
              return (
                <ArticleHeading
                  title={props.children as string}
                  as="h3"
                  {...props}
                />
              );
            },
            h4: (props) => {
              return (
                <ArticleHeading
                  title={props.children as string}
                  as="h4"
                  {...props}
                />
              );
            },
            h5: (props) => {
              return (
                <ArticleHeading
                  title={props.children as string}
                  as="h5"
                  {...props}
                />
              );
            },
            h6: (props) => {
              return (
                <ArticleHeading
                  title={props.children as string}
                  as="h6"
                  {...props}
                />
              );
            },
            IntroAnchor: (props) => (
              <ArticleHeading
                className="-mb-4 h-[1px]"
                title="introduction"
                as="h2"
                {...props}
              />
            ),
            CodePlayground: (props) => <CodePlayground {...props} />,
            Link: (props) => <Link {...props} />,
            TextPopover: (props) => <TextPopover {...props} />,
            ArticleImage: (props) => <ArticleImage {...props} />,
          }}
        />
        <Link
          href={`
          /${type === "bytes" ? "bytes" : "ideas"}`}
          className="flex items-center gap-2 pt-12 md:pt-24"
          prefetch={true}
        >
          <ArrowLeft size={16} /> Back to {type === "bytes" ? "bytes" : "ideas"}
        </Link>
      </article>
      <TableOfContents postLanguage={language} headings={headings} />
      <ResetHeading />
    </div>
  );
};

export default Article;
