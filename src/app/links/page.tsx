import { FileText, FolderOpenDot, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

import ChatMessage from "@/app/links/components/chat-message";
import { Dock, DockIcon, Separator } from "@/components/dock";
import PageWrapper from "@/components/page-wrapper";
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
          <ChatMessage text={t("quickAbout")} className="text-base" />
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
          <Tooltip label="Email" href={socials.email}>
            <FaEnvelope size={20} aria-label="Email" />
          </Tooltip>
        </DockIcon>
        <Separator />
        <DockIcon>
          <Tooltip label="LinkedIn" href={socials.linkedin}>
            <FaLinkedin size={20} aria-label="LinkedIn" />
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
        <ShinyButton
          as="a"
          target="_blank"
          href={socials.brNewsletter}
          className="w-full text-center"
          size="linktree"
        >
          🇧🇷 newsletter: Dev na Gringa
        </ShinyButton>
        <Button
          className="w-full"
          variant="outline"
          size="linktree"
          as="a"
          href="/#projects"
        >
          <FolderOpenDot size={18} />
          {t("projects")}
        </Button>
        <Button
          className="w-full"
          variant="outline"
          size="linktree"
          as="a"
          target="_blank"
          href={socials.youtube}
        >
          <FaYoutube size={18} />
          YouTube
        </Button>
        <Button
          className="w-full"
          variant="outline"
          size="linktree"
          as="a"
          target="_blank"
          href={socials.resume}
        >
          <FileText size={18} />
          {t("resume")}
        </Button>
       <Button
          className="w-full"
          variant="outline"
          size="linktree"
          as="a"
          target="_blank"
          href={socials.calendar}
        >
          <PhoneCall size={18} />
          {t("bookACall")}
        </Button>
      </div>
    </PageWrapper>
  );
}
