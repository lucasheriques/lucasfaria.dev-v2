import { socials } from "@/helpers/constants";

function Footer() {
  return (
    <footer className="flex justify-between w-full px-6 items-center h-20 md:h-40 md:max-w-3xl mx-auto">
      © 2020-present Lucas Faria.
      <div className="flex gap-4">
        <a
          href={socials.github}
          className="hover:text-amber-400 transition-colors"
          target="_blank"
        >
          GitHub
        </a>
        <a
          href={socials.linkedin}
          className="hover:text-amber-400 transition-colors"
          target="_blank"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;
