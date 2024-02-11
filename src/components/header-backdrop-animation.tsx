"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const HeaderBackdropAnimation = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 border-b border-amber-400"
        layoutId="hovered-backdrop"
        exit={{ opacity: 0 }}
      />
    </AnimatePresence>
  );
};
