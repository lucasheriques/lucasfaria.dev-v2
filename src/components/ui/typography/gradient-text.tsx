import { cn } from "@/helpers/functions";

const gradientTextColors = {
  purple: "from-purple-800 to-blue-500",
  green: "from-green-800 to-green-500",
  blue: "from-blue-800 to-blue-500",
  emerald: "from-emerald-800 to-emerald-500",
  violet: "from-violet-800 to-violet-500",
  rose: "from-rose-800 to-rose-500",
  sky: "from-sky-800 to-sky-500",
  cyan: "from-cyan-800 to-cyan-500",
  pink: "from-pink-800 to-pink-600",
  amber: "from-amber-800 to-amber-500",
};

const gradientDarkModeTextColors = {
  purple: "dark:from-purple-500 dark:to-purple-200",
  green: "dark:from-green-500 dark:to-green-200",
  blue: "dark:from-blue-500 dark:to-blue-200",
  emerald: "dark:from-emeralddark:stroke-emerald-400-500 dark:to-emerald-200",
  violet: "dark:from-violet-500 dark:to-violet-200",
  rose: "dark:from-rose-500 dark:to-rose-200",
  sky: "dark:from-sky-500 dark:to-sky-200",
  cyan: "dark:from-cyan-500 dark:to-cyan-200",
  pink: "dark:from-pink-500 dark:to-pink-200",
  amber: "dark:from-amber-500 dark:to-amber-200",
};

type GradientTextProps = {
  children: React.ReactNode;
  lightModeColor?: keyof typeof gradientTextColors;
  darkModeColor?: keyof typeof gradientDarkModeTextColors;
  className?: string;
};

export const GradientText = ({
  children,
  lightModeColor = "purple",
  darkModeColor = "purple",
  className,
}: GradientTextProps) => {
  return (
    <span
      className={cn(
        gradientTextColors[lightModeColor],
        gradientDarkModeTextColors[darkModeColor],
        "bg-gradient-to-r from-purple-800 to-blue-500",
        "bg-transparent bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
};
