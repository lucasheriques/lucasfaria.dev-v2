"use client";

import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProps,
  SandpackProvider,
  UnstyledOpenInCodeSandboxButton,
  useSandpack,
  useSandpackConsole,
} from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import { useAnimate, useSpring } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  Delete,
  ExternalLink,
  Info,
  RefreshCw,
} from "lucide-react";

import { cn } from "@/helpers/functions";
import { setSandboxActiveView } from "@/store/app-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type SandpackMessageConsoleMethods =
  | "log"
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "table"
  | "clear"
  | "time"
  | "timeEnd"
  | "count"
  | "assert";

type LogProps = {
  data: Array<string | Record<string, any>> | undefined;
  id: string;
  method: SandpackMessageConsoleMethods;
};

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

function Actions() {
  const { sandpack, dispatch: sandpackDispatch } = useSandpack();
  const activeView = useAppSelector((state) => state.app.sandboxActiveView);
  const appDispatch = useAppDispatch();
  const [scope, animate] = useAnimate();
  const spring = useSpring(180);

  const handleRefresh = () => {
    sandpackDispatch({ type: "refresh" });
    animate(
      scope.current,
      { rotate: 180 },
      {
        duration: 2,
        type: "spring",
        onComplete() {
          animate(scope.current, { rotate: 0 }, { duration: 0 });
        },
      },
    );
  };

  const toggleView = (view: "preview" | "console") => {
    appDispatch(setSandboxActiveView(view));
  };

  return (
    <div className="flex justify-between border border-zinc-700 bg-zinc-900 p-3">
      <div>
        <button
          className={cn(
            "p-2",
            activeView === "preview" && "border-b border-amber-500",
          )}
          onClick={() => toggleView("preview")}
        >
          Preview
        </button>
        <button
          className={cn(
            "p-2",
            activeView === "console" && "border-b border-amber-500",
          )}
          onClick={() => toggleView("console")}
        >
          Console
        </button>
      </div>
      <div className="flex items-center">
        <button onClick={handleRefresh} ref={scope}>
          <RefreshCw className="h-5 w-5 text-zinc-300" />
        </button>
      </div>
    </div>
  );
}

type LogItemProps = {
  method: SandpackMessageConsoleMethods;
  data:
    | Array<
        | string
        | {
            "@t": string;
            data: { name?: string; message?: string; stack?: any };
          }
        | Record<string, string>
      >
    | undefined;
};

function LogItem({ method, data }: LogItemProps) {
  const getColorForMethod = (): string => {
    switch (method) {
      case "warn":
        return "text-yellow-300"; // Bright yellow for warnings
      case "error":
        return "text-red-400"; // Bright red for errors
      default:
        return "text-gray-300"; // Light gray for other logs, ensuring readability
    }
  };

  const getIcon = () => {
    switch (method) {
      case "error":
        return <AlertCircle className="h-4 w-4 min-w-4" />;
      case "warn":
        return <AlertTriangle className="h-4 w-4 min-w-4" />;
      default:
        return <Info className="h-4 w-4 min-w-4" />;
    }
  };

  if (!data) {
    return null;
  }

  const renderData = () => {
    return data
      ?.map((item, index) => {
        if (typeof item === "string") {
          return <span key={index}>{item}</span>;
        } else if (item && typeof item === "object") {
          // Check for the specific structure with `item.data.message`
          if (
            item["@t"] &&
            item.data &&
            typeof item.data !== "string" &&
            item.data.message
          ) {
            return <span key={index}>{item.data.message}</span>;
          } else {
            // Handle general object case, including `Record<string, string>`
            // Convert object to string to display it. Adjust formatting as needed.
            const objectString = Object.entries(item)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ");
            return <span key={index}>{`{ ${objectString} }`}</span>;
          }
        }
        return null; // In case none of the above conditions match
      })
      .filter(Boolean); // Filter out any null values
  };
  return (
    <div className={cn(getColorForMethod(), "my-2")}>
      <span className={cn("flex items-center gap-2", getColorForMethod())}>
        {getIcon()}
        {renderData()}
      </span>
    </div>
  );
}

function Console() {
  const { logs, reset } = useSandpackConsole({
    resetOnPreviewRestart: true,
  });

  const activeView = useAppSelector((state) => state.app.sandboxActiveView);

  return (
    <div
      className={cn(
        "not-prose h-72 overflow-auto bg-slate-900",
        activeView !== "console" && "hidden",
      )}
    >
      <ol className="flex flex-col gap-1 text-base">
        {logs.map((log, i) => (
          <li key={log.id}>
            <LogItem key={log.id} {...log} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Preview() {
  const activeView = useAppSelector((state) => state.app.sandboxActiveView);

  return (
    <>
      <div className="rounded-b-lg bg-slate-900 p-4">
        <div
          className={cn(
            "overflow-hidden rounded bg-white p-1",
            activeView === "preview" ? "block" : "hidden",
          )}
        >
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            className={cn("h-72")}
          />
        </div>
        <Console />
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
          <Actions />
          <Preview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
