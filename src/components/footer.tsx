import { socials } from "@/helpers/constants";

function Footer() {
  return (
    <footer className="mx-auto flex h-40 w-full items-center justify-between px-6 md:max-w-3xl">
      © 2020-present Lucas Faria.
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
      </div>
    </footer>
  );
}

export default Footer;
