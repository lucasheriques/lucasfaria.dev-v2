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
  headings: {
    level: number;
    title: string;
    id: string;
  }[];
};

type TableOfContentsProps = {
  headings: {
    level: number;
    title: string;
    id: string;
  }[];
};

/**
 * TableOfContents components that receives heading as props
 * is fixed when the user scrolls past the article
 * and also keeps track on the current heading
 * @param headings
 */
const TableOfContents = ({ headings }: TableOfContentsProps) => {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-36">
        <ul className="">
          {headings.map((heading) => (
            <li key={heading.title}>
              <a href={`#${heading.id}`}>{heading.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const Article = ({ title, date, content, type, headings }: ArticleProps) => {
  const humanizedDate = format(new Date(date), "MMMM do, yyyy");
  return (
    <div className="grid lg:article-grid gap-y-8 sm:gap-y-12 px-6 relative">
      <aside className="hidden lg:flex"></aside>
      <article className="prose dark:prose-invert text-xl font-serif max-w-full overflow-hidden text-gray-100 lg:px-4">
        <h1>{title}</h1>
        {humanizedDate}
        <MDXRemote
          source={content}
          components={{
            pre: (props) => <CodeSnippet {...props} />,
            a: (props) => <a {...props} target="_blank" />,
            h2: (props) => {
              console.log({ props });
              // Assume props.chilcren is a string
              // Wrap the heading in a div, where the div id
              // should be the heading text, all lowercase and
              // with spaces replaced with hyphens
              const title = props.children as string;
              const id = title
                .toLowerCase()
                .replace(/\s/g, "-")
                .replace(/[^a-zA-Z0-9-]/g, "");
              return (
                <h2 id={id} {...props}>
                  {props.children}
                </h2>
              );
            },
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
      <TableOfContents headings={headings} />
    </div>
  );
};

export default Article;
