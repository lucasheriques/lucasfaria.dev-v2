"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import React, { useState } from "react";
import { type VariantProps, tv } from "tailwind-variants";
import { useLocalStorage } from "usehooks-ts";

const banner = tv({
  base: "flex items-center justify-between p-4 rounded-lg shadow-sm border backdrop-blur-sm",
  variants: {
    intent: {
      info: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800",
      warning:
        "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800",
      success:
        "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800",
      danger:
        "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800",
    },
  },
  defaultVariants: {
    intent: "info",
  },
});

const IconMap = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  danger: AlertCircle,
};

interface BaseBannerProps extends VariantProps<typeof banner> {
  children: React.ReactNode;
}

export function Banner({ children, intent = "info" }: BaseBannerProps) {
  const Icon = IconMap[intent];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={banner({ intent })}
    >
      <div className="flex flex-1 items-center space-x-3">
        <Icon size={20} />
        <div className="text-sm font-medium">{children}</div>
      </div>
    </motion.div>
  );
}

interface DismissableBannerProps extends BaseBannerProps {
  onDismiss?: () => void;
}

export function DismissableBanner({
  children,
  intent = "info",
  onDismiss,
}: DismissableBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = IconMap[intent];

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
          className={banner({ intent })}
        >
          <div className="flex flex-1 items-center space-x-3">
            <Icon size={20} />
            <div className="text-sm font-medium">{children}</div>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-4 rounded text-current transition-colors hover:text-opacity-75 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface LocalStorageDismissableBannerProps extends BaseBannerProps {
  localStorageKey: string;
}

export function LocalStorageDismissableBanner({
  children,
  intent = "info",
  localStorageKey,
}: LocalStorageDismissableBannerProps) {
  const [isDismissed, setIsDismissed] = useLocalStorage(localStorageKey, false);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <DismissableBanner intent={intent} onDismiss={handleDismiss}>
      {children}
    </DismissableBanner>
  );
}
