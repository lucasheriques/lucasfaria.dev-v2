"use client";

import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";

import { Title } from "./typography";

import { currentHeadingAtom } from "@/helpers/atoms";

const ArticleHeading = ({
  title,
  as,
}: {
  title: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  const setCurrentHeading = useSetAtom(currentHeadingAtom);
  const headingRef = useRef(null);

  const id = title
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          console.log("triggered for ", id);
          setCurrentHeading(id);
        }
      },
      { rootMargin: "-25% 0px", threshold: 0 },
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, [id, setCurrentHeading]);

  return (
    <Title as={as} ref={headingRef} id={id} className="dark:text-amber-400">
      {title}
    </Title>
  );
};

export default ArticleHeading;
