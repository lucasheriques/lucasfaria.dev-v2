import React from "react";

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
      className={`dark:text-emerald-400 text-2xl font-semibold ${className}`}
      {...props}
      ref={ref}
    >
      {children}
    </Tag>
  );
};
export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(_Title);

export const GradientText = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="dark:bg-gradient-to-r from-purple-500 dark:to-purple-200 bg-clip-text bg-transparent text-transparent">
      {children}
    </span>
  );
};
