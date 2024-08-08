"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { forwardRef } from "react";
import { Dialog, Modal } from "react-aria-components";
import { useOnClickOutside } from "usehooks-ts";

import { HeaderBackdropAnimation } from "./header-backdrop-animation";

import DarkLightToggle from "@/components/dark-light-toggle";
import LocaleToggle from "@/components/locale-toggle";
import { cn } from "@/helpers/functions";

const navItems = [
  { key: "writing", href: "/writing" },
  { key: "about", href: "/about" },
  // { label: "recommendations", href: "/recommendations" },
];

const navItemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1, // Increase delay for each item
      duration: 0.4,
    },
  }),
  exit: {
    x: -50, // Slide to the left
    opacity: 0,
    transition: { duration: 0.3 }, // Make it a bit faster for a smooth exit
  },
};

const MenuToggle = forwardRef(
  (
    { isOpen, toggle }: { isOpen: boolean; toggle: () => void },
    ref: React.Ref<HTMLButtonElement> | null,
  ) => {
    return (
      <motion.button
        ref={ref}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        onClick={toggle}
        className="fixed right-4 top-4 z-50 p-2"
        aria-label="Open menu"
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          className="stroke-gray-900 dark:stroke-gray-300"
        >
          <motion.path
            fill="transparent"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 6 L 20 6" }, // Adjusted Y coordinate for the first line
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          {/* Removed the middle line */}
          <motion.path
            fill="transparent"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 12 L 20 12" }, // Adjusted Y coordinate for the second line
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </motion.button>
    );
  },
);

MenuToggle.displayName = "MenuToggle";

const modalBackgroundVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(12px)",
    transition: {
      duration: 0.5, // Total duration for the fade-in and blur effect
      ease: "easeInOut",
      backdropFilter: {
        delay: 0.3, // Start blurring after 0.3 seconds
      },
    },
  },
};

export function HeaderNavigationMobile() {
  const [isOpen, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null); // Ref for the <button> element
  const navRef = React.useRef<HTMLElement>(null); // Ref for the <nav> element
  const t = useTranslations("nav");

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside([navRef, buttonRef], handleClickOutside, "touchstart");

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="block md:hidden">
      <MenuToggle isOpen={isOpen} toggle={toggleOpen} ref={buttonRef} />

      <AnimatePresence>
        {isOpen && (
          <Modal
            isDismissable
            isOpen={isOpen}
            className="fixed inset-0 z-40 overflow-hidden"
          >
            <motion.div
              className="absolute h-full w-full bg-emerald-100/95 dark:bg-gray-950/95"
              variants={modalBackgroundVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Dialog aria-label="Navigation menu" className="outline-none">
                <nav
                  className="absolute top-1/4 flex w-3/4 flex-col text-xl font-semibold capitalize outline-none"
                  ref={navRef}
                >
                  {navItems.map((item, i) => (
                    <Link
                      href={item.href}
                      prefetch={true}
                      onClick={toggleOpen}
                      key={item.key}
                      className="px-8 py-4"
                    >
                      <motion.div
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        exit="exit" // Use the exit variant when the modal is closing
                        variants={navItemVariants}
                      >
                        {t(item.key)}
                      </motion.div>
                    </Link>
                  ))}
                  <div className="px-8 pt-16 duration-1000 animate-in fade-in">
                    <DarkLightToggle />
                    <LocaleToggle />
                  </div>
                </nav>
              </Dialog>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HeaderNavigation() {
  const [hoveredNavItem, setHoveredNavItem] = React.useState<string | null>(
    null,
  );
  const t = useTranslations("nav");

  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
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
          return (
            <div key={item.key} className="relative flex items-center">
              <HeaderBackdropAnimation
                isVisible={hoveredNavItem === item.href}
              />
              <Link
                href={item.href}
                className={cn(
                  "relative p-2 transition-colors duration-300 hover:text-amber-600 dark:hover:text-amber-400",
                  isActive ? "text-amber-600 dark:text-amber-400" : "",
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
                  t(item.key)
                )}
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
