"use client";

import React from "react";
import { HeaderBackdropAnimation } from "./header-backdrop-animation";
import Link from "next/link";

const navItems = [
  { label: "home", href: "/" },
  { label: "ideas", href: "/ideas" },
  { label: "bytes", href: "/bytes" },
  { label: "work", href: "/work" },
];

const HeaderNavigation = () => {
  const [hoveredNavItem, setHoveredNavItem] = React.useState<string | null>(
    null
  );

  return (
    <nav
      className="flex font-semibold -ml-4"
      onMouseLeave={() => setHoveredNavItem(null)}
    >
      {navItems.map((item) => (
        <div key={item.label} className="relative flex">
          {hoveredNavItem === item.href && <HeaderBackdropAnimation />}
          <Link
            href={item.href}
            className="relative px-4 py-2 transition-colors duration-300 hover:text-amber-300-400 dark:hover:text-amber-400"
            onMouseEnter={() => setHoveredNavItem(item.href)}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default HeaderNavigation;
