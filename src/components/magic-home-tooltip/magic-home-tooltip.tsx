"use client";

import { Button } from "react-aria-components";

import Sheet from "../sheet";
import { TooltipContent } from "./tooltip-content";

export default function MagicHomeTooltipV2() {
  return (
    <Sheet
      triggerButton={({ onPress }) => (
        <Button
          className="underline decoration-wavy outline-1 outline-emerald-800"
          onPress={onPress}
        >
          little home
        </Button>
      )}
    >
      {(close) => <TooltipContent close={close} />}
    </Sheet>
  );
}
