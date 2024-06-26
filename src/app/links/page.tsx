import PageWrapper from "@/components/page-wrapper";
import Button from "@/components/ui/button";
import { socials } from "@/helpers/constants";

export default function Links() {
  return (
    <PageWrapper className="grid max-w-80 gap-y-4 sm:gap-y-4">
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
      <a href={socials.github} target="_blank">
        <Button className="w-full" variant="outline">
          GitHub
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
