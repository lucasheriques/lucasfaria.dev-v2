import { Coffee } from "lucide-react";
import Image from "next/image";

import EspressoMachine from "../espresso-machine/espresso-machine";
import GlowingButton from "../glowing-button";

type TooltipContentProps = {
  close: () => void;
};

export function TooltipContent({ close }: TooltipContentProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="m-4 flex flex-col items-center gap-8  overflow-auto rounded-3xl border-4 border-dotted border-amber-600 bg-amber-100 p-4 font-medium md:overflow-hidden dark:border-purple-900 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-8 rounded-3xl lg:flex-row">
          <div>
            <Image
              src="/magic-home-big.jpg"
              alt="A little home"
              className="rounded-3xl"
              width={512}
              height={512}
              priority
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
            <div>
              <EspressoMachine />
              <span className="flex items-center justify-center gap-2 text-sm">
                Try clicking on the <Coffee />
              </span>
            </div>
          </div>
        </div>
      </div>
      <GlowingButton onClick={close}>Close</GlowingButton>
    </div>
  );
}
