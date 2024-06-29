import React from "react";

import { cn } from "@/helpers/functions";

type TitleProps = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: React.ReactNode;
} & React.HTMLProps<HTMLHeadingElement>;

const _Title = (
  { as: Tag = "h1", className, children, ...props }: TitleProps,
  ref: React.Ref<HTMLHeadingElement>,
) => {
  return (
    <Tag
      className={cn(
        "text-2xl font-semibold text-emerald-600 dark:text-emerald-400",
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </Tag>
  );
};
export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(_Title);
