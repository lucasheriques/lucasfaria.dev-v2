"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  OverlayArrow,
  Popover,
  Switch,
} from "react-aria-components";

import EspressoMachine from "./espresso-machine";

import GlowingButton from "@/components/glowing-button";

export default function MagicHomeTooltip() {
  const [showModal, setShowModal] = React.useState(false);
  const scrollRef = React.useRef(null);

  const openModal = () => setShowModal(true);

  return (
    <DialogTrigger>
      <Button className="underline decoration-wavy outline-1 outline-emerald-800">
        little home
      </Button>
      <Popover className="overflow-auto" scrollRef={scrollRef}>
        {({ isEntering, isExiting }) => {
          console.log(isEntering);
          return (
            <Dialog className="outline-none" ref={scrollRef}>
              {({ close }) => (
                <motion.div
                  animate={{
                    scale: [0, 1],
                  }}
                  className="m-4 flex flex-col items-center gap-8 overflow-auto rounded-3xl border-4 border-dotted border-purple-900 bg-slate-900 p-4"
                >
                  <div className="flex flex-col items-center gap-8 overflow-auto rounded-3xl lg:flex-row">
                    <div>
                      <Image
                        src="/magic-home.jpg"
                        alt="A little home"
                        className="rounded-3xl"
                        width={512}
                        height={512}
                        priority
                      />
                    </div>
                    <div className="flex max-w-96 flex-col items-center justify-center gap-4">
                      <p>
                        Welcome to my digital home, crafted with a sprinkle of
                        AI magic!
                      </p>
                      <p>
                        Here, I try to create interactions people love and share
                        all my learning stories. {"It's"} a place of creativity
                        and warmth.
                      </p>
                      <p>
                        Feel free to explore and enjoy a virtual cup of coffee.{" "}
                        {"I'm"} excited to get to know you better.
                      </p>
                      <EspressoMachine />
                    </div>
                  </div>
                  <GlowingButton onClick={close}>Close</GlowingButton>
                </motion.div>
              )}
            </Dialog>
          );
        }}
      </Popover>
    </DialogTrigger>
  );
}
