"use client";

import { useEffect, useRef } from "react";

import { Title } from "./ui/typography";

import { setCurrentHeading } from "@/store/app-slice";
import { useAppDispatch } from "@/store/hooks";

const ArticleHeading = ({
  title,
  as,
  className,
}: {
  title: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}) => {
  const dispatch = useAppDispatch();
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
          dispatch(setCurrentHeading(id));
        }
      },
      { rootMargin: "-10% 0px", threshold: 0 },
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [id, dispatch]);

  return (
    <Title
      as={as}
      ref={headingRef}
      id={id}
      className={`scroll-my-32 ${className}`}
    >
      {title === "introduction" ? "" : title}
    </Title>
  );
};

export default ArticleHeading;
