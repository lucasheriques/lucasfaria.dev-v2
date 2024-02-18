import React from "react";

import { cn } from "@/helpers/functions";

export default function PageWrapper({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-3xl flex-col gap-y-8 px-6 sm:gap-y-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
