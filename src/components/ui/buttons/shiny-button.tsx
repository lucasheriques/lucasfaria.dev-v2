"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { type AnimationProps, motion } from "framer-motion";
import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { Button as AriaButton } from "react-aria-components";

import { cn } from "@/helpers/functions";

const sizeVariants = cva(
  "relative rounded-lg font-medium backdrop-blur-xl transition-[box-shadow] duration-300 ease-in-out hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] bg-gradient-to-r from-sky-200 to-fuchsia-200 dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--shiny-button)/10%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--shiny-button)/10%)]",
  {
    variants: {
      size: {
        default: "px-4 py-2 min-w-24",
        small: "px-2 py-1 min-w-20 text-sm",
        icon: "p-2 rounded-full",
        linktree: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const animationProps: AnimationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

type ShinyButtonProps<T extends ElementType> = VariantProps<
  typeof sizeVariants
> &
  ComponentPropsWithoutRef<T> & {
    as?: T;
    children?: React.ReactNode;
  };

const Animation = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <span
        className="relative block h-full w-full text-lg tracking-wide text-emerald-900 dark:text-[rgb(255,255,255,90%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--shiny-button)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--shiny-button)) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--shiny-button)/20%)_calc(var(--x)+20%),hsl(var(--shiny-button)/60%)_calc(var(--x)+25%),hsl(var(--shiny-button)/20%)_calc(var(--x)+100%))] p-px"
      ></span>
    </>
  );
};

function ShinyButton<T extends ElementType = typeof AriaButton>({
  children = "shiny-button",
  size = "default",
  className,
  as,
  ...rest
}: ShinyButtonProps<T>) {
  const Component = motion(as || AriaButton);

  return (
    <Component
      {...animationProps}
      className={cn(sizeVariants({ size }), className)}
      {...rest}
    >
      <Animation>{children}</Animation>
    </Component>
  );
}

export default ShinyButton;
