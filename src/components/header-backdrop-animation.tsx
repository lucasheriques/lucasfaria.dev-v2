"use client";

import { AnimatePresence, motion } from "framer-motion";

export const HeaderBackdropAnimation = () => {
  return (
    <AnimatePresence>
      <motion.div
        aria-hidden
        className="absolute inset-0 border-b border-amber-400 hidden md:block"
        layoutId="hovered-backdrop"
        exit={{ opacity: 0 }}
      />
    </AnimatePresence>
  );
};
