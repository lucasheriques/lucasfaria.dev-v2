"use client";

import dynamic from "next/dynamic";

const PortugueseContentBanner = dynamic(
  () => import("./portuguese-content-banner"),
  {
    ssr: false,
  },
);

export { PortugueseContentBanner };
