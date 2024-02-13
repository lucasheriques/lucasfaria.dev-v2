import Image from "next/image";
import { Button, Tooltip, TooltipTrigger } from "react-aria-components";

import EspressoMachine from "./espresso-machine";

export default function MagicHomeTooltip() {
  return (
    <TooltipTrigger delay={1000} isOpen={true}>
      <Button className="lg:underline lg:decoration-wavy">little home</Button>
      <Tooltip className="border-12 mt-4 flex items-start rounded-3xl border-8 border-dotted border-purple-900 bg-gray-900">
        <div className="flex gap-8 p-4">
          <div>
            <Image
              src="/magic-home.jpg"
              alt="A little home"
              className="rounded-3xl"
              width={512}
              height={512}
            />
          </div>
          <div className="flex max-w-96 flex-col items-center justify-center gap-4 text-base">
            <p>
              This is how I imagine of my house on the web! (with a little bit
              of help from AI)
            </p>
            <p>
              A place where I feel comfortable and can work towards making
              magical little interactions and products people love using.
            </p>
            <p>
              Come in, and help yourself to some coffee. {"I'd"} love to get you
              know you a little bit better.
            </p>
            <EspressoMachine />
          </div>
        </div>
      </Tooltip>
    </TooltipTrigger>
  );
}
