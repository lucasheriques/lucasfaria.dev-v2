"use client";

import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";

export default function SandpackWrapper({
  files,
  options,
  ...props
}: SandpackProps) {
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
        template="react-ts"
        theme={nightOwl}
        files={{
          "public/index.html": {
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
            hidden: true,
          },
          ...files,
        }}
        {...props}
      />
    </div>
  );
}
