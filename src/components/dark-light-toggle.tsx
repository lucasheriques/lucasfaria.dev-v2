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

  async function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    setThemeCookie(nextTheme);

    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);
  }

  return (
    <button onClick={handleClick} className={cn("text-4xl", className)}>
      {theme === "light" ? "🌞" : "🌚"}
    </button>
  );
}
