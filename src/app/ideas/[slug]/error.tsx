"use client";

import NotFound from "@/components/errors/not-found";
import PageWrapper from "@/components/page-wrapper";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error.message.includes("ENOENT")) {
    return (
      <PageWrapper>
        <NotFound />
      </PageWrapper>
    );
  }

  return (
    <div>
      <h2>Something went wrong!</h2>
      {error.message}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
