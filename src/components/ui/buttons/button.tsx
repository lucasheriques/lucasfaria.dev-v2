"use client";

import { motion } from "framer-motion";
import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { Button as AriaButton } from "react-aria-components";
import { VariantProps, tv } from "tailwind-variants";

import { buttonsFocusRing } from "@/components/ui/utils";
import { cn } from "@/helpers/functions";

const buttonVariants = tv({
  extend: buttonsFocusRing,
  base: "inline-flex items-center justify-center rounded-md text-base font-medium disabled:opacity-50 font-sans gap-2",
  variants: {
    variant: {
      default: "bg-emerald-600 dark:bg-emerald-700 text-slate-100",
      secondary:
        "bg-slate-200 dark:bg-slate-600 text-black dark:text-slate-100",
      purple: "bg-purple-600 dark:bg-purple-700 text-slate-100",
      destructive: "bg-rose-500 dark:bg-rose-700 text-white",
      outline:
        "bg-white dark:bg-slate-800 border border-slate-400 dark:border-slate-500 text-slate-900 dark:text-slate-100",
      link: "bg-transparent",
      linktree:
        "w-full bg-gradient-to-r from-emerald-400 to-blue-500 dark:from-purple-600 dark:to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 dark:shadow-purple-900/30 dark:hover:shadow-indigo-800/40",
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Button;
