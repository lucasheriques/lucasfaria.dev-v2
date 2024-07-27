"use client";

import {
  Tooltip as AriaTooltip,
  Button,
  OverlayArrow,
  TooltipTrigger,
} from "react-aria-components";

interface Props {
  children: React.ReactNode;
  label: string;
}

export function Tooltip({ children, label }: Props) {
  return (
    <TooltipTrigger>
      <Button>{children}</Button>
      <AriaTooltip className="group">
        <OverlayArrow>
          <svg width={8} height={8} viewBox="0 0 8 8">
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
        {label}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
