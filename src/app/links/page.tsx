import Image from "next/image";
import { FaLinkedin } from "react-icons/fa6";

import PageWrapper from "@/components/page-wrapper";
import Button from "@/components/ui/buttons/button";
import ShinyButton from "@/components/ui/buttons/shiny-button";
import { Tooltip } from "@/components/ui/tooltip/tooltip";
import { socials } from "@/helpers/constants";

export const metadata = {
  title: "Social Links — Lucas Faria",
  description: "A list of links to my social media and other platforms.",
};

export default function Links() {
  return (
    <PageWrapper className="grid flex-grow-0 gap-4 sm:gap-4">
      <Image
        src="/profile.jpg"
        alt="Lucas Faria's profile picture"
        width={128}
        height={128}
        className="mx-auto rounded-full"
        priority
      />
      <Tooltip label="LinkedIn">
        <FaLinkedin size={36} />
      </Tooltip>
      <a href={socials.brNewsletter} target="_blank">
        <ShinyButton
          text="🇧🇷 newsletter (Dev na Gringa)"
          className="w-full"
          size="linktree"
        />
      </a>
      <a href={socials.linkedin} target="_blank">
        <Button className="w-full" variant="linktree" size="linktree">
          LinkedIn
        </Button>
      </a>
      <a href={socials.twitter} target="_blank">
        <Button className="w-full" variant="linktree" size="linktree">
          Twitter (X)
        </Button>
      </a>
      <a href={socials.instagram} target="_blank">
        <Button className="w-full" variant="linktree" size="linktree">
          Instagram
        </Button>
      </a>
      <a href={socials.tiktok} target="_blank">
        <Button className="w-full" variant="linktree" size="linktree">
          TikTok
        </Button>
      </a>
      <a href={socials.github} target="_blank">
        <Button className="w-full" variant="linktree" size="linktree">
          GitHub
        </Button>
      </a>
      <a href={socials.tabNews} target="_blank">
        <Button className="w-full" variant="outline" size="linktree">
          TabNews
        </Button>
      </a>
      <a href={socials.devTo} target="_blank">
        <Button className="w-full" variant="linktree" size="linktree">
          Dev.to
        </Button>
      </a>
    </PageWrapper>
  );
}
