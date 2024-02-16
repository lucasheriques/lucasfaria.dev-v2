"use client";

import { Sandpack, SandpackInternal } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";

export default function SandpackWrapper(props: SandpackInternal) {
  return (
    <div className="py-8">
      <Sandpack
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        customSetup={{
          dependencies: {
            "lucide-react": "^0.323.0",
            clsx: "^2.1.0",
          },
        }}
        theme={nightOwl}
        {...props}
      />
    </div>
  );
}
