import { Code } from "bright";
import React from "react";

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
