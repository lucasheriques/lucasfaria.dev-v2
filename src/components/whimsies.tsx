"use client";

import { Sparkle } from "lucide-react";
import React from "react";
import colors from "tailwindcss/colors";

import { random } from "@/helpers/functions";
import usePrefersReducedMotion from "@/helpers/use-prefers-reduced.motion";
import useRandomInterval from "@/helpers/use-random-interval";

type Props = {
  rainbow?: boolean;
  children: React.ReactNode;
};

const spaklersColors = [
  colors.red[400],
  colors.orange[400],
  colors.amber[400],
  colors.emerald[400],
  colors.blue[400],
  colors.indigo[400],
  colors.violet[400],
];

const generateSparkle = ({
  color = spaklersColors[1],
  rainbow = false,
}: {
  color?: string;
  rainbow?: boolean;
}) => {
  const randomTop = random(0, 20) % 2 === 0 ? random(0, 15) : random(55, 70);

  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    // Bright yellow color:
    color: rainbow ? spaklersColors[random(0, spaklersColors.length)] : color,
    size: random(10, 20),
    style: {
      // Pick a random spot in the available space
      top: randomTop + "%",
      left: random(0, 90) + "%",
      // Float sparkles above sibling content
      zIndex: 10,
    },
  };
};

type SparkleType = ReturnType<typeof generateSparkle>;

const SparkleInstance = ({ color, style, size }: SparkleType) => (
  <span
    className="pointer-events-none absolute
    block motion-safe:animate-grow-and-shrink"
    style={style}
  >
    <Sparkle
      size={size}
      fill={color}
      strokeWidth={0}
      className="z-10 motion-safe:animate-controlled-spin"
    />
  </span>
);

export const SparklesWhimsy = ({ rainbow, children }: Props) => {
  const [enabled, setEnabled] = React.useState(true);
  const [sparkles, setSparkles] = React.useState<SparkleType[]>(() =>
    Array.from({ length: 3 }).map(() =>
      generateSparkle({
        rainbow,
      }),
    ),
  );
  const prefersReducedMotion = usePrefersReducedMotion();

  useRandomInterval({
    callback: () => {
      const now = Date.now();

      // Generate new sparkle
      const sparkle = generateSparkle({
        rainbow,
      });

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
