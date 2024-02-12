"use client";

import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

import { Title } from "./typography";

import { currentHeadingAtom } from "@/helpers/atoms";

const ArticleHeading = ({
  title,
  as,
  className,
}: {
  title: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}) => {
  const setCurrentHeading = useSetAtom(currentHeadingAtom);
  const headingRef = useRef(null);

  const id = title
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");

  useEffect(() => {
    const ref = headingRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          console.log("entry id is", id);
          setCurrentHeading(id);
        }
      },
      { rootMargin: "-30% 0px", threshold: 0 },
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [id, setCurrentHeading]);

  return (
    <Title
      as={as}
      ref={headingRef}
      id={id}
      className={`dark:text-amber-400 scroll-my-32 ${className}`}
    >
      {title === "introduction" ? "" : title}
    </Title>
  );
};

export default ArticleHeading;
