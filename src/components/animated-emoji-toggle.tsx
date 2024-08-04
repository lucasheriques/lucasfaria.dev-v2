"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/helpers/functions";

type AnimatedEmojiToggleProps = {
  isActive: boolean;
  activeEmoji: string;
  inactiveEmoji: string;
  onClick: () => void;
  className?: string;
};

export default function AnimatedEmojiToggle({
  isActive,
  activeEmoji,
  inactiveEmoji,
  onClick,
  className,
}: AnimatedEmojiToggleProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn("relative h-12 w-12 overflow-hidden text-4xl", className)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={isActive ? "active" : "inactive"}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isActive ? activeEmoji : inactiveEmoji}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
