import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

import styles from "./glowing-button.module.css";

// Adjust the import path as needed

type GlowingButtonProps = {
  onClick: () => void;
  children?: React.ReactNode;
};

const GlowingButton = ({ onClick, children }: GlowingButtonProps) => {
  return (
    <motion.button
      className={clsx(
        styles.rotatingBackground,
        styles["hover:glow"],
        "mx-auto w-full rounded-xl p-1 font-bold text-gray-50 transition-all duration-300 md:mr-0 lg:mr-auto lg:w-72 dark:block",
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
    >
      <span className="block rounded-md bg-indigo-800 p-3">{children}</span>
    </motion.button>
  );
};

export default GlowingButton;
