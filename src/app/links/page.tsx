import { FolderOpenDot } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  FaDev,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

import { Dock, DockIcon, Separator } from "@/components/dock";
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
      <div className="flex items-center gap-4 justify-self-center rounded-lg bg-amber-300/40 p-4 dark:bg-slate-800 dark:text-gray-100">
        <Image
          src="/profile.jpg"
          alt="Lucas Faria's profile picture"
          width={48}
          height={48}
          className="rounded-full"
          priority
        />
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
              luke
            </span>
            <span className="text-xs text-gray-700 dark:text-gray-400">
              {new Date().toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <TypingText
            text={t("quickAbout")}
            className="text-base"
            duration={20}
          />
        </div>
      </div>

      <Dock
        className="mt-0 flex items-center justify-center gap-1 sm:gap-4"
        distance={50}
        direction="middle"
      >
        <DockIcon>
          <Tooltip label="GitHub" href={socials.github}>
            <FaGithub size={20} aria-label="GitHub" />
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip label="Dev.to" href={socials.devTo}>
            <FaDev size={20} aria-label="Dev.to" />
          </Tooltip>
        </DockIcon>
        <Separator />
        <DockIcon>
          <Tooltip label="LinkedIn" href={socials.linkedin}>
            <FaLinkedin size={20} aria-label="LinkedIn" />
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip label="Twitter/X" href={socials.twitter}>
            <FaTwitter size={20} aria-label="Twitter/X" />
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip label="Instagram" href={socials.instagram}>
            <FaInstagram size={20} aria-label="Instagram" />
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip label="TikTok" href={socials.tiktok}>
            <FaTiktok size={20} aria-label="TikTok" />
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip label="Reddit" href={socials.reddit}>
            <FaReddit size={20} aria-label="Reddit" />
          </Tooltip>
        </DockIcon>
      </Dock>

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
