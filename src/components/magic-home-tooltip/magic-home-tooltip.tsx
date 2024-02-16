"use client";

import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Button } from "react-aria-components";

import { TooltipContent } from "@/components/magic-home-tooltip/tooltip-content";
import Sheet from "@/components/sheet";
import { GradientText } from "@/components/typography";
import { displayLittleHomeAnimation } from "@/helpers/atoms";

const MotionButton = motion(Button);

export default function MagicHomeTooltipV2() {
  const [display, setDisplay] = useAtom(displayLittleHomeAnimation);

  const scaleVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <Sheet
      triggerButton={({ onPress }) =>
        !display ? (
          <MotionButton
            className="outline-1 outline-emerald-800"
            onPress={() => {
              setDisplay(false);
              onPress();
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
