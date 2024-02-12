"use client";

import clsx from "clsx";
import { useAtomValue } from "jotai";

import { Title } from "./typography";

import { currentHeadingAtom } from "@/helpers/atoms";

type TableOfContentsProps = {
  headings: {
    level: number;
    title: string;
    id: string;
  }[];
};

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const activeHeading = useAtomValue(currentHeadingAtom);

  console.log({ activeHeading, headings });
  return (
    <aside className="hidden lg:block sticky top-36 h-40 pl-8">
      <Title as="h2" className="text-sm pb-2">
        Table of Contents
      </Title>
      <nav className="">
        {headings.map((heading) => {
          const margin = `ml-${(heading.level - 1) * 2}`;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={clsx(
                "block hover:text-amber-400 transition-colors duration-300 text-sm",
                margin,
                heading.id === activeHeading
                  ? "text-amber-400"
                  : "text-gray-500",
              )}
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
