import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

import CodeSnippet from "./code-snippet";

type ArticleProps = {
  title: string;
  date: any;
  content: string;
  type: "byte" | "idea";
};

const Article = ({ title, date, content, type }: ArticleProps) => {
  const humanizedDate = format(new Date(date), "MMMM do, yyyy");
  return (
    <div className="grid lg:article-grid gap-y-8 sm:gap-y-12 px-6">
      <aside className="hidden lg:flex"></aside>
      <article className="prose dark:prose-invert text-xl font-serif max-w-full overflow-hidden text-gray-100 lg:px-4">
        <h1>{title}</h1>
        {humanizedDate}
        <MDXRemote
          source={content}
          components={{
            pre: (props) => <CodeSnippet {...props} />,
            a: (props) => <a {...props} target="_blank" />,
          }}
        />
        <Link
          href={`
          /${type === "byte" ? "bytes" : "ideas"}`}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to {type === "byte" ? "bytes" : "ideas"}
        </Link>
      </article>
      <aside className="hidden lg:flex">Table of Contents</aside>
    </div>
  );
};

export default Article;
