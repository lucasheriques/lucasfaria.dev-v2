import { composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export const buttonsFocusRing = tv({
  base: "outline-none focus:outline-2 focus:outline-cyan-700/60 dark:focus:outline-cyan-400/50 transition-[outline] duration-300",
});

export const ariaFocusRing = tv({
  base: "outline outline-cyan-700/60 dark:outline-cyan-400/50 forced-colors:outline-[Highlight] outline-offset-4",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}
