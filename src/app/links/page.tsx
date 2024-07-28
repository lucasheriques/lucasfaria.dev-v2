import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";

import PageWrapper from "@/components/page-wrapper";
import { TypingText } from "@/components/text-animations";
import Button from "@/components/ui/buttons/button";
import ShinyButton from "@/components/ui/buttons/shiny-button";
import { Tooltip } from "@/components/ui/tooltip/tooltip";
import { socials } from "@/helpers/constants";

export const metadata = {
  title: "Social Links — Lucas Faria",
  description: "A list of links to my social media and other platforms.",
};

export default function Links() {
  const t = useTranslations("links");
  return (
    <PageWrapper className="grid flex-grow-0 gap-4 sm:gap-4">
      <div className="sm flex items-center gap-4 justify-self-center rounded-lg p-2 dark:bg-zinc-900">
        <Image
          src="/profile.jpg"
          alt="Lucas Faria's profile picture"
          width={48}
          height={48}
          className="rounded-full"
          priority
        />
        <div className="flex-1">
          <TypingText
            text={t("quickAbout")}
            className="text-base font-semibold"
            duration={20}
          />
        </div>
      </div>
      <Tooltip label="LinkedIn">
        <FaLinkedin size={36} />
      </Tooltip>
      <a href={socials.brNewsletter} target="_blank">
        <ShinyButton
          text="🇧🇷 newsletter: Dev na Gringa"
          className="w-full"
          size="linktree"
        />
      </a>
      <Link href={"/#projects"} prefetch={true}>
        <Button className="w-full" variant="outline" size="linktree">
          Projects
        </Button>
      </Link>
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
