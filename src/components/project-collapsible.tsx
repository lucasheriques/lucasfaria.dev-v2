"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FolderDot, FolderOpenDot } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const CollapsibleContent = motion(Collapsible.Content);

interface ProjectCollapsibleProps {
  project: {
    id: string;
    title: string;
    description: string;
    expandedContent?: string;
    link: string;
  };
  visitProjectText: string;
}

const ProjectCollapsible: React.FC<ProjectCollapsibleProps> = ({
  project,
  visitProjectText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className="overflow-hidden rounded-lg border border-amber-200 bg-amber-50 text-base shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
    >
      <Collapsible.Trigger className="flex w-full items-center justify-between p-4 text-left">
        <div className="flex items-center space-x-3">
          <div className="relative h-6 w-6">
            <motion.div
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <FolderDot className="h-6 w-6 text-amber-600 dark:text-blue-400" />
            </motion.div>
            <motion.div
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <FolderOpenDot className="h-6 w-6 text-amber-600 dark:text-blue-400" />
            </motion.div>
          </div>
          <span className="text-lg font-medium text-amber-900 dark:text-gray-100">
            {project.title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="#92400E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dark:stroke-gray-400"
            />
          </svg>
        </motion.div>
      </Collapsible.Trigger>
      <AnimatePresence initial={false}>
        {isOpen && (
          <CollapsibleContent
            forceMount
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="space-y-3 p-4 text-amber-900 dark:text-gray-300">
              <p>{project.description}</p>
              {project.expandedContent && (
                <p className="text-sm text-amber-700 dark:text-gray-400">
                  {project.expandedContent}
                </p>
              )}
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm text-amber-600 transition-colors hover:text-amber-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <span>{visitProjectText}</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </Collapsible.Root>
  );
};

export default ProjectCollapsible;
