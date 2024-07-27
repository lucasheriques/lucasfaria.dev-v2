import Link from "next/link";

function Footer() {
  return (
    <footer className="mx-auto flex h-32 w-full flex-col items-center justify-center gap-1 px-6 pt-8 text-base md:max-w-3xl md:flex-row md:justify-between">
      © 2024 Lucas Faria
      <div className="flex gap-4">
        <Link href="/links">Links</Link>
      </div>
    </footer>
  );
}

export default Footer;
