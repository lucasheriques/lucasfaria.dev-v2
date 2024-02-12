import React from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-8 sm:gap-y-12 max-w-3xl mx-auto px-4">
      {children}
    </div>
  );
}
