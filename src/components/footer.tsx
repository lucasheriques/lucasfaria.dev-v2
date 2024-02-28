import { socials } from "@/helpers/constants";

function Footer() {
  return (
    <footer className="mx-auto flex h-32 w-full flex-col items-center justify-center gap-1 px-6 pt-8 text-base md:max-w-3xl md:flex-row md:justify-between">
      © 2024 Lucas Faria
      <div className="flex gap-4">
        <a
          href={socials.github}
          className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
          target="_blank"
        >
          GitHub
        </a>
        <a
          href={socials.linkedin}
          className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
          target="_blank"
        >
          LinkedIn
        </a>
        {/* <a
          href={socials.twitter}
          className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
          target="_blank"
        >
          Twitter (X)
        </a> */}
      </div>
    </footer>
  );
}

export default Footer;
