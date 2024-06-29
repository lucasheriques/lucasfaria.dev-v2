"use client";

import { motion } from "framer-motion";
import { Button } from "react-aria-components";

import { TooltipContent } from "@/components/little-home-button/tooltip-content";
import Sheet from "@/components/sheet";
import { GradientText } from "@/components/ui/typography/gradient-text";
import { setLittleHomeDisplayAnimation } from "@/helpers/server-actions";

const MotionButton = motion(Button);

export default function LittleHomeButton({
  displayAnimation,
}: {
  displayAnimation: boolean;
}) {
  return (
    <Sheet
      triggerButton={({ onPress }) =>
        !displayAnimation ? (
          <MotionButton
            className="outline-1 outline-emerald-800"
            onPress={() => {
              onPress();
              setLittleHomeDisplayAnimation();
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <GradientText darkModeColor="amber" lightModeColor="violet">
              little home
            </GradientText>
          </MotionButton>
        ) : (
          <Button
            className="underline decoration-wavy outline-1 outline-emerald-800"
            onPress={() => {
              onPress();
            }}
          >
            little home
          </Button>
        )
      }
    >
      {(close) => <TooltipContent close={close} />}
    </Sheet>
  );
}
