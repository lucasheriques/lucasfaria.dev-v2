"use client";

import React, { memo } from "react";

import AnimatedEmojiToggle from "./animated-emoji-toggle";

import { setThemeCookie } from "@/helpers/server-actions";
import { setTheme } from "@/store/app-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type DarkLightToggleProps = {
  className?: string;
};

function DarkLightToggle({ className }: DarkLightToggleProps) {
  const theme = useAppSelector((state) => state.app.theme);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    document
      .querySelector("hyvor-talk-comments")
      ?.setAttribute("colors", theme);
  }, [theme]);

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(nextTheme));
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

export default memo(DarkLightToggle);
