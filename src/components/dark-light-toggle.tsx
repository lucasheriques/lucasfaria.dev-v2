"use client";

import React from "react";

import { setThemeCookie } from "@/helpers/server-actions";

type DarkLightToggleProps = {
  initialTheme: "light" | "dark";
};

export default function DarkLightToggle({
  initialTheme,
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
    <button onClick={handleClick} className="text-4xl">
      {theme === "light" ? "🌞" : "🌚"}
    </button>
  );
}
