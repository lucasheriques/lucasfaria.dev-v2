"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";

import { HeaderBackdropAnimation } from "./header-backdrop-animation";

import DarkLightToggle from "@/components/dark-light-toggle";
import { cn } from "@/helpers/functions";

const navItems = [
  { label: "ideas", href: "/ideas" },
  { label: "bytes", href: "/bytes" },
  { label: "about", href: "/about" },
  { label: "recommendations", href: "/recommendations" },
];

export function HeaderNavigationMobile({
  initialTheme,
}: {
  initialTheme: "light" | "dark";
}) {
  return (
    <div className="block md:hidden">
      <DialogTrigger>
        <Button>Open</Button>
        <Dialog>
          {({ close }) => (
            <ModalOverlay
              className={cn("fixed inset-0 z-50 bg-white bg-opacity-95")}
            >
              <Modal>
                <nav className="absolute top-24 flex flex-col gap-4 p-4">
                  <div>
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        prefetch={true}
                        onClick={close}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <DarkLightToggle initialTheme={initialTheme} />
                  </div>
                </nav>
              </Modal>
            </ModalOverlay>
          )}
        </Dialog>
      </DialogTrigger>
    </div>
  );
}

export default function HeaderNavigation() {
  const [hoveredNavItem, setHoveredNavItem] = React.useState<string | null>(
    null,
  );

  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      <div>
        <Link href={"/"} prefetch={true}>
          <Image src="/house-nobg.png" alt="Home" width={48} height={48} />
        </Link>
      </div>
      <nav
        className="hidden gap-2 py-2 text-lg font-semibold md:flex"
        onMouseLeave={() => setHoveredNavItem(null)}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.href === "/recommendations") {
            return null;
          }

          return (
            <div key={item.label} className="relative flex items-center">
              <HeaderBackdropAnimation
                isVisible={hoveredNavItem === item.href}
              />
              <Link
                href={item.href}
                className={cn(
                  "relative p-2 transition-colors duration-300 hover:text-amber-700 dark:hover:text-amber-400",
                  isActive ? "text-amber-700 dark:text-amber-400" : "",
                )}
                prefetch={true}
                onMouseEnter={() => setHoveredNavItem(item.href)}
              >
                {item.href === "/" ? (
                  <Image
                    src="/house-nobg.png"
                    alt="Home"
                    width={48}
                    height={48}
                  />
                ) : (
                  item.label
                )}
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
