"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { forwardRef } from "react";
import { Dialog, Modal } from "react-aria-components";
import { useOnClickOutside } from "usehooks-ts";

import { HeaderBackdropAnimation } from "./header-backdrop-animation";

import DarkLightToggle from "@/components/dark-light-toggle";
import { cn } from "@/helpers/functions";

const navItems = [
  { label: "ideas", href: "/ideas" },
  { label: "bytes", href: "/bytes" },
  { label: "about", href: "/about" },
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
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <motion.path
            fill="transparent"
            strokeWidth="2"
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
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </motion.button>
    );
  },
);

MenuToggle.displayName = "MenuToggle";

export function HeaderNavigationMobile({
  initialTheme,
}: {
  initialTheme: "light" | "dark";
}) {
  const [isOpen, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLDivElement>(null); // Ref for the <button> element
  const navRef = React.useRef<HTMLDivElement>(null); // Ref for the <nav> element

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside([navRef, buttonRef], handleClickOutside, "touchstart");

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="block md:hidden">
      <div ref={buttonRef}>
        <MenuToggle isOpen={isOpen} toggle={toggleOpen} />
      </div>

      <Modal
        isDismissable
        isOpen={isOpen}
        className={cn(
          "fixed inset-0 z-40 bg-emerald-100/85 backdrop-blur-sm dark:bg-gray-950/90",
          "animate-in fade-in",
        )}
      >
        <Dialog aria-label="Navigation menu">
          <nav
            className="absolute top-1/4 flex w-3/4 flex-col text-xl capitalize"
            ref={navRef}
          >
            <AnimatePresence>
              {isOpen && (
                <>
                  {navItems.map((item, i) => (
                    <Link
                      href={item.href}
                      prefetch={true}
                      onClick={toggleOpen}
                      key={item.label}
                      className="px-6 py-4"
                    >
                      <motion.div
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={navItemVariants}
                      >
                        {item.label}
                      </motion.div>
                    </Link>
                  ))}
                </>
              )}
            </AnimatePresence>
            <div className="px-6 pt-16 duration-1000 animate-in fade-in">
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
