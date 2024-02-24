"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Dialog, Modal } from "react-aria-components";

import { HeaderBackdropAnimation } from "./header-backdrop-animation";

import DarkLightToggle from "@/components/dark-light-toggle";
import { cn } from "@/helpers/functions";

const navItems = [
  { label: "ideas", href: "/ideas" },
  { label: "bytes", href: "/bytes" },
  { label: "about", href: "/about" },
  { label: "recommendations", href: "/recommendations" },
];

const MenuToggle = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => (
  <motion.button
    initial={false}
    animate={isOpen ? "open" : "closed"}
    onClick={() => {
      console.log({ isOpen });
      toggle();
    }}
    className="fixed right-3 top-3 z-50 p-3"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </motion.button>
);

export function HeaderNavigationMobile({
  initialTheme,
}: {
  initialTheme: "light" | "dark";
}) {
  const [isOpen, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen(!isOpen);
  console.log({ isOpen });
  return (
    <div className="block md:hidden">
      <MenuToggle isOpen={isOpen} toggle={toggleOpen} />

      <Modal
        isDismissable
        isOpen={isOpen}
        className={cn(
          "fixed inset-0 z-40 bg-white bg-opacity-95",
          "animate-in fade-in",
        )}
      >
        <Dialog aria-label="Navigation menu">
          <nav className="p-6k absolute top-24 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div>
              <DarkLightToggle initialTheme={initialTheme} />
            </div>
          </nav>
        </Dialog>
      </Modal>
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
