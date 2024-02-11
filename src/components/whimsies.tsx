import { Sparkle } from "lucide-react";
import React from "react";

import { generateSparkle } from "@/helpers/functions";

type Props = {
  children: React.ReactNode;
};

type SparkleInstanceProps = {
  color: string;
  style: React.CSSProperties;
  size: number;
};

const SparkleInstance = ({ color, style, size }: SparkleInstanceProps) => (
  <Sparkle
    size={size}
    fill={color}
    strokeWidth={0}
    style={style}
    className="absolute pointer-events-none z-20"
  />
);

export const SparklesWhimsy = ({ children }: Props) => {
  const sparkle = generateSparkle();

  return (
    <span className="relative inline-block">
      <SparkleInstance
        color={sparkle.color}
        style={sparkle.style}
        size={sparkle.size}
      />
      <strong className="relative z-10 font-bold">{children}</strong>
    </span>
  );
};
