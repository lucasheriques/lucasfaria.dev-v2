"use client";

import React from "react";

import AnimatedEmojiToggle from "./animated-emoji-toggle";

import { setThemeCookie } from "@/helpers/server-actions";

type DarkLightToggleProps = {
  initialTheme: "light" | "dark";
  className?: string;
};

export default function DarkLightToggle({
  initialTheme,
  className,
}: DarkLightToggleProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">(initialTheme);

  React.useEffect(() => {
    document
      .querySelector("hyvor-talk-comments")
      ?.setAttribute("colors", theme);
  }, [theme]);

  async function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    setThemeCookie(nextTheme);

    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);
    document
      .querySelector("hyvor-talk-comments")
      ?.setAttribute("colors", nextTheme);
  }

  return (
    <AnimatedEmojiToggle
      isActive={theme === "dark"}
      activeEmoji="🌚"
      inactiveEmoji="🌞"
      onClick={handleClick}
      className={className}
    />
  );
}
