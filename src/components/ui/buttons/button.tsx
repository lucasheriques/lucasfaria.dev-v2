"use client";

import { AnimationProps, motion } from "framer-motion";
import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { Button as AriaButton } from "react-aria-components";
import { VariantProps, tv } from "tailwind-variants";

import { buttonsFocusRing } from "@/components/ui/utils";
import { cn } from "@/helpers/functions";

const buttonVariants = tv({
  extend: buttonsFocusRing,
  base: "inline-flex items-center justify-center rounded-lg text-base font-medium disabled:opacity-50 font-sans gap-2",
  variants: {
    variant: {
      default: "bg-emerald-600 dark:bg-emerald-700 text-slate-100",
      secondary:
        "bg-slate-200 dark:bg-slate-600 text-black dark:text-slate-100",
      purple: "bg-purple-600 dark:bg-purple-700 text-slate-100",
      destructive: "bg-rose-500 dark:bg-rose-700 text-white",
      outline:
        "bg-slate-50 dark:bg-slate-900 border border-slate-400 dark:border-slate-700 text-slate-900 dark:text-slate-200",
      link: "bg-transparent",
      linktree:
        "w-full bg-gradient-to-r from-emerald-400 to-blue-500 dark:from-violet-600 dark:to-pink-600 text-white hover:shadow-xl dark:shadow-violet-900/30 dark:hover:shadow-violet-800/40",
    },
    size: {
      default: "px-4 py-2 min-w-24",
      small: "px-2 py-1 min-w-20 text-sm",
      icon: "p-2 rounded-full",
      linktree: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps<T extends ElementType> = VariantProps<typeof buttonVariants> &
  ComponentPropsWithoutRef<T> & {
    as?: T;
    onHoverStart?: (e: any) => void;
    onHoverEnd?: (e: any) => void;
    children?: React.ReactNode;
  };

const animationProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: {
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

function Button<T extends ElementType = typeof AriaButton>({
  variant,
  size,
  className,
  children,
  as,
  ...rest
}: ButtonProps<T>) {
  const Component = motion(as || AriaButton);

  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      {...animationProps}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Button;
