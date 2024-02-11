import React from "react";
import { Code } from "bright";

const CodeSnippet = (props: any) => {
  return (
    <Code
      theme="material-palenight"
      className="text-xl border border-slate-700"
      {...props}
    />
  );
};

export default CodeSnippet;
