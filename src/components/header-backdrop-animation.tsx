"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export const HeaderBackdropAnimation = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 border-b border-amber-400 hidden md:block"
        layoutId="hovered-backdrop"
        exit={{ opacity: 0 }}
      />
    </AnimatePresence>
  );
};
