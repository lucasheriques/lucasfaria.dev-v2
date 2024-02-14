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
      className="-ml-4 flex gap-2 py-2 text-lg font-semibold"
      onMouseLeave={() => setHoveredNavItem(null)}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        if (item.href === "/recommendations") {
          return null;
        }

        return (
          <div key={item.label} className="relative flex items-center">
            <HeaderBackdropAnimation isVisible={hoveredNavItem === item.href} />
            <Link
              href={item.href}
              className={clsx(
                "relative p-2 transition-colors duration-300 hover:text-amber-700 dark:hover:text-amber-400",
                isActive ? "text-amber-700 dark:text-amber-400" : "",
              )}
              prefetch={true}
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
