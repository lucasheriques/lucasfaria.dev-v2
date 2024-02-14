"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button, Tooltip, TooltipTrigger } from "react-aria-components";

import EspressoMachine from "./espresso-machine";

export default function MagicHomeTooltip() {
  return (
    <TooltipTrigger delay={500}>
      <Button className="underline decoration-wavy">little home</Button>
      <Tooltip className="m-4 overflow-auto rounded-3xl border-4 border-dotted border-purple-900 bg-slate-900">
        <motion.div
          animate={{}}
          className="flex flex-col items-center gap-8 p-4 lg:flex-row"
        >
          <div>
            <Image
              src="/magic-home.jpg"
              alt="A little home"
              className="rounded-3xl"
              width={512}
              height={512}
            />
          </div>
          <div className="flex max-w-96 flex-col items-center justify-center gap-4">
            <p>
              Welcome to my digital home, crafted with a sprinkle of AI magic!
            </p>
            <p>
              Here, I try to create interactions people love and share all my
              learning stories. {"It's"} a place of creativity and warmth.
            </p>
            <p>
              Feel free to explore and enjoy a virtual cup of coffee. {"I'm"}{" "}
              excited to get to know you better.
            </p>
            <EspressoMachine />
          </div>
        </motion.div>
      </Tooltip>
    </TooltipTrigger>
  );
}
