"use client";

import { useAtom } from "jotai";
import React from "react";

import { Title } from "./ui/typography";

import { currentHeadingAtom } from "@/helpers/atoms";
import { cn } from "@/helpers/functions";

type TableOfContentsProps = {
  postLanguage?: string;
  headings: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    title: string;
    id: string;
  }[];
};

const marginsForHeadingLevels = {
  1: "ml-0",
  2: "ml-0",
  3: "ml-4",
  4: "ml-8",
  5: "ml-12",
  6: "ml-16",
};

function Heading({ level, title, id }: TableOfContentsProps["headings"][0]) {
  const [activeHeading, setCurrentHeading] = useAtom(currentHeadingAtom);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("href");
    const id = target?.replace("#", "");

    history.pushState(null, "", target);

    const element = document.getElementById(id || "");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setCurrentHeading(id || "");
  };

  return (
    <a
      href={`#${id}`}
      className={cn(
        "block scroll-smooth transition-colors duration-300 hover:text-amber-700 hover:dark:text-amber-400",
        marginsForHeadingLevels[level],
        id === activeHeading
          ? "font-semibold text-amber-700 dark:text-amber-400"
          : "text-gray-800 dark:text-gray-500",
      )}
      onClick={handleAnchorClick}
    >
      {title}
    </a>
  );
}

const TableOfContents = ({ postLanguage, headings }: TableOfContentsProps) => {
  if (headings.length === 0) {
    return <aside />;
  }

  return (
    <aside className="table-of-contents sticky top-1/4 mx-auto hidden h-40 w-3/4 max-w-xl pt-0 text-sm xl:block 2xl:text-base">
      <Title as="h2" className="pb-2 text-sm">
        Table of Contents
      </Title>
      <nav className="flex flex-col gap-1 py-4">
        <Heading
          level={1}
          title={postLanguage === "pt-br" ? "Introdução" : "Introduction"}
          id="introduction"
        />
        {headings.map((heading) => {
          return <Heading key={heading.id} {...heading} />;
        })}
      </nav>
    </aside>
  );
};

export default TableOfContents;
