import * as React from "react";

import { socials } from "@/helpers/constants";

function Footer() {
  return (
    <footer className="flex justify-between w-full px-6 items-center h-40">
      <a
        href="https://cal.com/lucasfaria"
        target="_blank"
        className="text-amber-400 font-semibold"
      >
        Book a chat with me! I love meeting new people.
      </a>
      <div className="flex gap-2">
        <a href={socials.github} target="_blank">
          GitHub
        </a>
        <a href={socials.linkedin} target="_blank">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;
