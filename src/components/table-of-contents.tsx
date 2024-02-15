"use client";

import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";

import { Title } from "./typography";

import { currentHeadingAtom, postLanguageAtom } from "@/helpers/atoms";

type TableOfContentsProps = {
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

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const [activeHeading, setCurrentHeading] = useAtom(currentHeadingAtom);
  const postLanguage = useAtomValue(postLanguageAtom);

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

  if (headings.length === 0) {
    return <aside />;
  }

  return (
    <aside className="table-of-contents sticky top-1/4 mx-auto hidden h-40 max-w-xl pt-0 text-sm lg:block 2xl:text-base">
      <Title as="h2" className="pb-2 text-sm">
        Table of Contents
      </Title>
      <nav className="flex flex-col gap-1 py-4">
        <a
          href="#introduction"
          className={clsx(
            "block scroll-smooth transition-colors duration-300 hover:text-amber-700 hover:dark:text-amber-400",
            marginsForHeadingLevels[2],
            "introduction" === activeHeading
              ? "font-medium text-amber-700 dark:text-amber-400"
              : "text-gray-700 dark:text-gray-500",
          )}
          onClick={handleAnchorClick}
        >
          {postLanguage === "en" ? "Introduction" : "Introdução"}
        </a>
        {headings.map((heading) => {
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={clsx(
                "block scroll-smooth transition-colors duration-300 hover:text-amber-700 hover:dark:text-amber-400",
                marginsForHeadingLevels[heading.level],
                heading.id === activeHeading
                  ? "font-medium text-amber-700 dark:text-amber-400"
                  : "text-gray-700 dark:text-gray-500",
              )}
              onClick={handleAnchorClick}
            >
              {heading.title}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default TableOfContents;
