"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { Button, Dialog, Modal, ModalOverlay } from "react-aria-components";

// Wrap React Aria modal components so they support framer-motion values.
const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

const inertiaTransition = {
  type: "inertia" as const,
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300,
};

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};

const SHEET_MARGIN = 34;

type BottomSheetProps = {
  children: (close: () => void) => React.ReactNode;
};

export default function Sheet({ children }: BottomSheetProps) {
  let [isOpen, setOpen] = useState(false);
  let h = typeof window !== "undefined" ? window.innerHeight - SHEET_MARGIN : 0;
  let y = useMotionValue(h);
  let bgOpacity = useTransform(y, [0, h], [0.4, 0]);
  let bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        className="underline decoration-wavy outline-1 outline-emerald-800"
        onPress={() => setOpen(true)}
      >
        little home
      </Button>
      <AnimatePresence>
        {isOpen && (
          <MotionModalOverlay
            // Force the modal to be open when AnimatePresence renders it.
            isOpen
            onOpenChange={setOpen}
            className="fixed inset-0 z-30"
            style={{ backgroundColor: bg as any }}
          >
            <MotionModal
              className="absolute bottom-0 w-full overflow-auto rounded-t-xl bg-stone-900 shadow-lg will-change-transform md:overflow-hidden"
              initial={{ y: h }}
              animate={{ y: 0 }}
              exit={{ y: h }}
              transition={staticTransition}
              style={{
                y,
                top: SHEET_MARGIN,
                // Extra padding at the bottom to account for rubber band scrolling.
                paddingBottom: window.screen.height,
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                  setOpen(false);
                } else {
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }}
            >
              <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-gray-400" />
              <Dialog className="px-4 pb-4 outline-none">
                <div className="flex justify-end">
                  <Button
                    className="pressed:text-blue-700 mb-8 rounded border-none bg-transparent text-lg font-semibold text-blue-600 outline-none focus-visible:ring"
                    onPress={() => setOpen(false)}
                  >
                    Done
                  </Button>
                </div>
                {children(handleClose)}
              </Dialog>
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
