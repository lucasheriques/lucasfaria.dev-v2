"use client";

import { AnimatePresence, motion } from "framer-motion";

export const HeaderBackdropAnimation = ({
  isVisible,
}: {
  isVisible: boolean;
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-hidden
          className="absolute inset-0 hidden border-b-2 border-amber-600 md:block dark:border-amber-400"
          layoutId="hovered-backdrop"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  );
};
