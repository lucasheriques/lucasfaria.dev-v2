"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { HeaderBackdropAnimation } from "./header-backdrop-animation";

const navItems = [
  { label: "home", href: "/" },
  { label: "ideas", href: "/ideas" },
  { label: "bytes", href: "/bytes" },
  { label: "about", href: "/about" },
  { label: "recommendations", href: "/recommendations" },
];

const HeaderNavigation = () => {
  const [hoveredNavItem, setHoveredNavItem] = React.useState<string | null>(
    null,
  );

  const pathname = usePathname();

  return (
    <nav
      className="flex font-semibold -ml-4 text-base py-2 gap-2"
      onMouseLeave={() => setHoveredNavItem(null)}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <div key={item.label} className="relative flex">
            {hoveredNavItem === item.href && <HeaderBackdropAnimation />}
            <Link
              href={item.href}
              className={clsx(
                "relative p-2 transition-colors duration-300 dark:hover:text-amber-400",
                isActive ? "text-amber-400" : "",
              )}
              onMouseEnter={() => setHoveredNavItem(item.href)}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default HeaderNavigation;
