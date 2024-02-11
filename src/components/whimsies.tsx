"use client";

import { Sparkle } from "lucide-react";
import React, { useEffect } from "react";

import { generateSparkle } from "@/helpers/functions";
import usePrefersReducedMotion from "@/helpers/use-prefers-reduced.motion";
import useRandomInterval from "@/helpers/use-random-interval";

type Props = {
  children: React.ReactNode;
};

type SparkleType = ReturnType<typeof generateSparkle>;

const SparkleInstance = ({ color, style, size }: SparkleType) => (
  <span
    className="absolute pointer-events-none motion-safe:animate-grow-and-shrink duration-[600ms] block"
    style={style}
  >
    <Sparkle
      size={size}
      fill={color}
      strokeWidth={0}
      className="z-10 motion-safe:animate-spin duration-[600ms]"
    />
  </span>
);

export const SparklesWhimsy = ({ children }: Props) => {
  const [enabled, setEnabled] = React.useState(true);
  const [sparkles, setSparkles] = React.useState<SparkleType[]>(() =>
    Array.from({ length: 3 }).map(() => generateSparkle()),
  );
  const prefersReducedMotion = usePrefersReducedMotion();

  useRandomInterval({
    callback: () => {
      const now = Date.now();

      // Generate new sparkle
      const sparkle = generateSparkle();

      // Clean up "expired" sparkles
      const nextSparkles = sparkles.filter(
        (sparkle) => now - sparkle.createdAt < 750,
      );

      nextSparkles.push(sparkle);

      setSparkles(nextSparkles);
    },

    minDelay: prefersReducedMotion && enabled ? undefined : 50,
    maxDelay: prefersReducedMotion && enabled ? undefined : 500,
  });

  const toggleSparkles = () => {
    setEnabled(!enabled);
  };

  if (!enabled) {
    return (
      <button onClick={toggleSparkles} className="cursor-pointer font-bold">
        {children}
      </button>
    );
  }

  return (
    <button
      className="relative inline-block cursor-pointer"
      onClick={toggleSparkles}
    >
      <strong className="relative z-20 font-bold">{children}</strong>
      {sparkles.map((sparkle) => (
        <SparkleInstance key={sparkle.id} {...sparkle} />
      ))}
    </button>
  );
};
