import PageWrapper from "@/components/page-wrapper";
import Button from "@/components/ui/buttons/button";
import ShinyButton from "@/components/ui/buttons/shiny-button";
import { socials } from "@/helpers/constants";

export const metadata = {
  title: "Social Links — Lucas Faria",
  description: "A list of links to my social media and other platforms.",
};

export default function Links() {
  return (
    <PageWrapper className="grid flex-grow-0 gap-4 sm:grid-cols-2 sm:gap-4">
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
