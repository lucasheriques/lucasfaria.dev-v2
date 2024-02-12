import React from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-y-8 px-6 sm:gap-y-12">
      {children}
    </div>
  );
}
