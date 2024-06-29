"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";
import React from "react";
import { Button as AriaButton, ButtonProps } from "react-aria-components";

import { cn } from "@/helpers/functions";

const MotionButton = motion(AriaButton);

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-base font-medium transition-colors disabled:opacity-50 font-sans gap-2",
  {
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
      },
      size: {
        default: "px-4 py-2 min-w-24",
        small: "px-2 py-1 min-w-20 text-sm",
        icon: "p-2 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type Props = ButtonProps &
  React.RefAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    onHoverStart?: (e: any) => void;
    onHoverEnd?: (e: any) => void;
    children?: React.ReactNode;
  };

function Button({ variant, size, className, children, ...rest }: Props) {
  return (
    <MotionButton
      className={cn(buttonVariants({ variant, size, className }))}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...rest}
    >
      {children}
    </MotionButton>
  );
}

export default Button;
