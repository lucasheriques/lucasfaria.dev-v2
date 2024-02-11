import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex w-full px-6 justify-between items-center h-[5rem]">
      <Link href="/">Lucas Faria</Link>
      <div className="flex gap-2">
        <Moon />
      </div>
    </header>
  );
}
