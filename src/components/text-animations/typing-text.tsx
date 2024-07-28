"use client";

import { useEffect, useState } from "react";

import { cn } from "@/helpers/functions";

interface TypingAnimationProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  duration?: number;
  className?: string;
}

export default function TypingAnimation({
  as: Tag = "h2",
  text,
  duration = 200,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, text]);

  return (
    <Tag className={cn("drop-shadow-sm", className)}>
      {displayedText ? displayedText : text}
    </Tag>
  );
}
