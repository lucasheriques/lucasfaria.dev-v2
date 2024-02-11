import React from "react";
import { Code } from "bright";

export default function CodeSnippet(props: any) {
  return <Code theme={"material-palenight"} className="text-xl" {...props} />;
}
