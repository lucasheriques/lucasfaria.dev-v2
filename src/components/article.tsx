import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

import Badge from "@/components/badge";
import Comments from "@/components/comments";
import ResetHeading from "@/components/reset-heading";
import TableOfContents from "@/components/table-of-contents";
import IdeasProgressBar from "@/components/ui/ideas-progress-bar";
import { Title } from "@/components/ui/typography";
import { type getPostInfoFromData } from "@/helpers/file-helpers";
import COMPONENT_MAP from "@/helpers/mdx-components";

type HeroProps = {
  title: string;
  humanizedDate: string;
  content: string; // Assuming this is the full article content for read time calculation
  type: "ideas" | "bytes";
  tags?: string;
};

const Hero = ({ title, humanizedDate, content, type, tags }: HeroProps) => {
  // Calculate read time
  const wordsPerMinute = 200;
  const cleanContent = content.replace(
    /<[^>]*>|{[^}]*}|\!*\[[^\]]*\]\([^)]*\)|\#{1,6}\s|\*{1,2}|\_{1,2}|\~{2}|\`{1,3}|\>|\-|\+|\d+\./g,
    "",
  );
  const numberOfWords = cleanContent.split(/\s+/).length;
  const readTime = Math.floor(numberOfWords / wordsPerMinute);

  return (
    <div className="not-prose space-y-2">
      <Title as="h1" className="text-4xl font-bold">
        {title}
      </Title>
      <p className="text-base dark:text-gray-50">
        {humanizedDate} {type === "ideas" && `· ${readTime} min read`}
      </p>
      {tags && <Badge>{tags}</Badge>}
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
  slug,
  tags,
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
          tags={tags}
        />
        <MDXRemote source={content} components={COMPONENT_MAP} />

        <Comments slug={slug} />

        <div className="pt-32">
          <Link
            href={`
          /${type === "bytes" ? "bytes" : "ideas"}`}
            className="flex items-center gap-2"
            prefetch={true}
          >
            <ArrowLeft size={16} /> Back to{" "}
            {type === "bytes" ? "bytes" : "ideas"}
          </Link>
        </div>
      </article>
      {type === "ideas" && (
        <TableOfContents postLanguage={language} headings={headings} />
      )}
      {type === "ideas" && <ResetHeading />}
    </div>
  );
};

export default Article;
