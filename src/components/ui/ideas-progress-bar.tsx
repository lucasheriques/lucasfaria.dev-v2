"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { cn } from "@/helpers/functions";

export default function IdeasProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "bottom fixed left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r",
        "from-amber-100 to-amber-500",
        "dark:from-emerald-400 dark:to-emerald-800",
      )}
      style={{ scaleX }}
    />
  );
}
