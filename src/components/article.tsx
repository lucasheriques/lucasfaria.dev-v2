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
    <div>
      <article className="prose dark:prose-invert text-xl font-serif text-gray-100">
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
    </div>
  );
};

export default Article;
