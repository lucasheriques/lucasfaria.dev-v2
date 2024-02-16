import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

import ArticleHeading from "@/components/article-heading";
import CodeSnippet from "@/components/code-snippet";
import EspressoMachine from "@/components/espresso-machine";
import ResetHeading from "@/components/reset-heading";
import SandpackWrapper from "@/components/sandpack-wrapper";
import TableOfContents from "@/components/table-of-contents";

type ArticleProps = {
  title: string;
  date: any;
  content: string;
  type: "byte" | "idea";
  headings: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    title: string;
    id: string;
  }[];
};

const Article = ({ title, date, content, type, headings }: ArticleProps) => {
  const humanizedDate = format(new Date(date), "MMMM do, yyyy");
  return (
    <div className="xl:article-grid relative mx-auto grid max-w-3xl gap-y-8 scroll-smooth px-6 sm:gap-y-12 xl:max-w-full">
      <aside className="hidden xl:flex"></aside>
      <article className="prose max-w-full overflow-hidden font-serif text-xl text-gray-950 dark:prose-invert xl:px-6 dark:text-gray-200">
        <h1>{title}</h1>
        {humanizedDate}
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
            EspressoMachine: () => <EspressoMachine />,
            Sandpack: (props) => <SandpackWrapper {...props} />,
          }}
        />
        <Link
          href={`
          /${type === "byte" ? "bytes" : "ideas"}`}
          className="flex items-center gap-2 pt-12 md:pt-24"
          prefetch={true}
        >
          <ArrowLeft size={16} /> Back to {type === "byte" ? "bytes" : "ideas"}
        </Link>
      </article>
      <TableOfContents headings={headings} />
      <ResetHeading />
    </div>
  );
};

export default Article;
