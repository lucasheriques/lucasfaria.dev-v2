"use client";

import { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  variant?: "info"; // Extend this type for other variants if needed
}

export default function _ExpandableContent({
  title,
  children,
  variant = "info",
}: AccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="not-prose rounded bg-sky-200 text-gray-900 dark:bg-gray-800 dark:text-gray-200"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="border-none px-4">
        <AccordionTrigger className="text-xl hover:no-underline">
          {title}
        </AccordionTrigger>
        <AccordionContent className="space-y-4 text-base">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
