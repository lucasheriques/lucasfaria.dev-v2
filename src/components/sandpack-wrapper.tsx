"use client";

import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProps,
  SandpackProvider,
  UnstyledOpenInCodeSandboxButton,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import { useAnimate } from "framer-motion";
import { Delete, ExternalLink, RefreshCw } from "lucide-react";

function TitleBar({ title = "Code Playground" }) {
  const { sandpack } = useSandpack();
  const { resetAllFiles } = sandpack;

  return (
    <div className="mb-0  flex items-center justify-between bg-zinc-700 px-3 py-2 sm:rounded-t-lg">
      <span className="text-sm font-bold text-white">{title}</span>
      <span className="align-center flex">
        <button className="" onClick={() => resetAllFiles()}>
          <Delete className="mr-4 h-5 w-5 text-zinc-300" />
        </button>
        <UnstyledOpenInCodeSandboxButton className="relative -top-[1px]">
          <ExternalLink className="h-5 w-5 text-zinc-300" />
        </UnstyledOpenInCodeSandboxButton>
      </span>
    </div>
  );
}

function Console() {
  const { sandpack, dispatch } = useSandpack();
  const [scope, animate] = useAnimate();

  const handleRefresh = () => {
    dispatch({ type: "refresh" });
    animate(
      scope.current,
      { rotate: 180 },
      {
        duration: 0.5,
        onComplete() {
          animate(scope.current, { rotate: 0 }, { duration: 0 });
        },
      },
    );
  };

  return (
    <div className="flex justify-between border border-zinc-700 bg-zinc-900 p-3">
      <div>
        <button>Preview</button>
        <button className="ml-2">Console</button>
      </div>
      <div>
        <button ref={scope} onClick={handleRefresh}>
          <RefreshCw className="h-5 w-5 text-zinc-300" />
        </button>
      </div>
    </div>
  );
}

function Preview() {
  return (
    <>
      <div className="rounded-b-lg bg-slate-800 p-4">
        <div className="overflow-hidden rounded bg-white p-1">
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            className="h-72"
          />
        </div>
      </div>
    </>
  );
}

export default function SandpackWrapper({
  files,
  options,
  ...props
}: SandpackProps) {
  return (
    <div className="py-8">
      <SandpackProvider
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
      >
        <SandpackLayout className="!-mx-4 !block !rounded-none sm:!mx-0 sm:!rounded-lg">
          <TitleBar />
          <SandpackCodeEditor showTabs />
          <Console />
          <Preview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
