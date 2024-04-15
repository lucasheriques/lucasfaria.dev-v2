"use client";

import React from "react";

import { cn } from "@/helpers/functions";
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
  }, [setTheme, theme]);

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
    <button onClick={handleClick} className={cn("text-4xl", className)}>
      {theme === "light" ? "🌞" : "🌚"}
    </button>
  );
}
