"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import React, { useState } from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
  link?: string;
  expandable?: boolean;
  expandedContent?: React.ReactNode;
}

const Card = ({
  title,
  children,
  link,
  expandable,
  expandedContent,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const contentVariants = {
    collapsed: {
      opacity: 0,
      height: 0,
      overflow: "hidden", // Ensure no content spills during collapse
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    expanded: {
      opacity: 1,
      height: "auto",
      overflow: "hidden", // Keeps content contained during expansion
      transition: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
    },
  };

  return (
    <motion.div
      className="grid gap-2 overflow-hidden rounded-lg bg-white px-6 py-4 shadow-lg dark:bg-gray-800"
      onMouseEnter={() => expandable && setIsHovered(true)}
      onMouseLeave={() => expandable && setIsHovered(false)}
      layout // This prop helps manage layout changes smoothly
    >
      {link ? (
        <a
          href={link}
          target="_blank"
          className="flex items-center justify-between"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <ExternalLink />
        </a>
      ) : (
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      )}
      <div className="text-base text-gray-700 dark:text-gray-300">
        {children}
      </div>
      <AnimatePresence>
        {isHovered && expandable && expandedContent && (
          <motion.div
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={contentVariants}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            {expandedContent}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Card;
