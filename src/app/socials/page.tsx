import PageWrapper from "@/components/page-wrapper";
import Button from "@/components/ui/button";
import { socials } from "@/helpers/constants";

export const metadata = {
  title: "Social Links — Lucas Faria",
  description: "A list of links to my social media and other platforms.",
};

export default function Links() {
  return (
    <PageWrapper className="grid flex-grow-0 gap-4 sm:grid-cols-2 sm:gap-4">
      <a href={socials.brNewsletter} target="_blank">
        <Button className="w-full" variant="purple">
          🇧🇷 newsletter (Dev na Gringa)
        </Button>
      </a>
      <a href={socials.linkedin} target="_blank">
        <Button className="w-full" variant="outline">
          LinkedIn
        </Button>
      </a>
      <a href={socials.twitter} target="_blank">
        <Button className="w-full" variant="outline">
          Twitter (X)
        </Button>
      </a>
      <a href={socials.instagram} target="_blank">
        <Button className="w-full" variant="outline">
          Instagram
        </Button>
      </a>
      <a href={socials.tiktok} target="_blank">
        <Button className="w-full" variant="outline">
          TikTok
        </Button>
      </a>
      <a href={socials.github} target="_blank">
        <Button className="w-full" variant="outline">
          GitHub
        </Button>
      </a>
      <a href={socials.tabNews} target="_blank">
        <Button className="w-full" variant="outline">
          TabNews
        </Button>
      </a>
      <a href={socials.devTo} target="_blank">
        <Button className="w-full" variant="outline">
          Dev.to
        </Button>
      </a>
    </PageWrapper>
  );
}
