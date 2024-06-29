"use client";

import GenericError from "@/components/errors/generic-error";
import NotFound from "@/components/errors/not-found";
import PageWrapper from "@/components/page-wrapper";

export const metadata = {
  title: "500: Internal Server Error",
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error.message.includes("ENOENT") || error.message.includes("404")) {
    return (
      <PageWrapper>
        <NotFound />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <GenericError />
    </PageWrapper>
  );
}
