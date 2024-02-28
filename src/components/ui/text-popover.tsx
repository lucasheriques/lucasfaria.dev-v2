"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  OverlayArrow,
  Popover,
} from "react-aria-components";
import { useOnClickOutside } from "usehooks-ts";

import { cn } from "@/helpers/functions";

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  withAsterisk?: boolean;
  delay?: number;
};

const tooltipTextColor = {
  purple: "text-purple-600 dark:text-purple-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
};

const tooltipBgColor = {
  purple: "bg-purple-700 dark:bg-purple-800",
  emerald: "bg-emerald-700 dark:bg-emerald-800",
};

const tooltipSvgColor = {
  purple:
    "fill-purple-700 stroke-purple-700 dark:fill-purple-800 dark:stroke-purple-800",
  emerald:
    "fill-emerald-700 stroke-emerald-700 dark:fill-emerald-800 dark:stroke-emerald-800",
};

export default function TextPopover({
  children,
  content,
  withAsterisk = true,
}: TooltipProps) {
  const [isOpen, setOpen] = React.useState(false);
  const popoverRef = React.useRef(null);

  const openPopover = () => {
    setOpen(true);
  };

  useOnClickOutside(popoverRef, () => setOpen(false));

  return (
    <DialogTrigger>
      <Button
        className={cn("inline-flex font-bold", tooltipTextColor.purple)}
        onPress={openPopover}
      >
        {children}
        {withAsterisk && <span className="text-xs">*</span>}
      </Button>
      <Popover
        ref={popoverRef}
        isOpen={isOpen}
        onOpenChange={setOpen}
        isNonModal
        className={({ isEntering, isExiting }) =>
          cn(
            "group absolute max-w-64 rounded-xl px-2 py-4 text-center text-sm text-gray-50",
            tooltipBgColor.purple,
            isEntering &&
              "duration-200 ease-out animate-in fade-in placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1",
            isExiting &&
              "duration-150 ease-in animate-out fade-out placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1",
          )
        }
        placement="top"
      >
        <OverlayArrow>
          <svg
            width={8}
            height={8}
            viewBox="0 0 8 8"
            className={cn(
              tooltipSvgColor.purple,
              "group-placement-bottom:rotate-180",
            )}
          >
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
        <Dialog className="outline-none">{content}</Dialog>
      </Popover>
    </DialogTrigger>
  );
}
