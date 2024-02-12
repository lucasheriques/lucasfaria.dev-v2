import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

import ArticleHeading from "./article-heading";
import CodeSnippet from "./code-snippet";
import TableOfContents from "./table-of-contents";

type ArticleProps = {
  title: string;
  date: any;
  content: string;
  type: "byte" | "idea";
  headings: {
    level: number;
    title: string;
    id: string;
  }[];
};

const Article = ({ title, date, content, type, headings }: ArticleProps) => {
  const humanizedDate = format(new Date(date), "MMMM do, yyyy");
  return (
    <div className="grid xl:article-grid gap-y-8 sm:gap-y-12 px-6 relative xl:max-w-full max-w-3xl mx-auto scroll-smooth">
      <aside className="hidden xl:flex"></aside>
      <article className="prose dark:prose-invert text-xl font-serif max-w-full overflow-hidden dark:text-gray-200 xl:px-6">
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
    </div>
  );
};

export default Article;
