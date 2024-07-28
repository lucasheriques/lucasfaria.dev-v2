import { FolderOpenDot } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

import PageWrapper from "@/components/page-wrapper";
import { TypingText } from "@/components/text-animations";
import Button from "@/components/ui/buttons/button";
import ShinyButton from "@/components/ui/buttons/shiny-button";
import { Tooltip } from "@/components/ui/tooltip/tooltip";
import { socials } from "@/helpers/constants";

export const metadata = {
  title: "Links | Lucas Faria",
  description: "A list of links to my content and social media.",
};

export default function Links() {
  const t = useTranslations("links");
  return (
    <PageWrapper className="grid flex-grow-0 gap-4 sm:gap-8">
      <div className="sm flex items-center gap-4 justify-self-center rounded-lg p-2 dark:bg-zinc-900">
        <Image
          src="/profile.jpg"
          alt="Lucas Faria's profile picture"
          width={48}
          height={48}
          className="rounded-full"
          priority
        />
        <TypingText
          text={t("quickAbout")}
          className="text-base font-semibold"
          duration={20}
        />
      </div>

      <div className="flex items-center justify-center gap-4">
        <Tooltip label="LinkedIn">
          <Link href={socials.linkedin}>
            <FaLinkedin size={24} />
          </Link>
        </Tooltip>
        <Tooltip label="Twitter/X">
          <Link href={socials.twitter}>
            <FaTwitter size={24} />
          </Link>
        </Tooltip>
        <Tooltip label="GitHub">
          <Link href={socials.github}>
            <FaGithub size={24} />
          </Link>
        </Tooltip>
        <Tooltip label="Instagram">
          <Link href={socials.instagram}>
            <FaInstagram size={24} />
          </Link>
        </Tooltip>
      </div>

      <div className="flex flex-col gap-4">
        <a href={socials.brNewsletter} target="_blank">
          <ShinyButton
            text="🇧🇷 newsletter: Dev na Gringa"
            className="w-full"
            size="linktree"
          />
        </a>
        <Link href="/#projects">
          <Button className="w-full" variant="outline" size="linktree">
            <FolderOpenDot size={18} />
            Projects
          </Button>
        </Link>
        <Link href={socials.youtube} target="_blank">
          <Button className="w-full" variant="outline" size="linktree">
            <FaYoutube size={18} />
            YouTube
          </Button>
        </Link>
      </div>
    </PageWrapper>
  );
}
