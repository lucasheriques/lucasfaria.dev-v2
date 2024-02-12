import { Code } from "bright";
import React from "react";

const CodeSnippet = (props: any) => {
  return (
    <Code
      theme="material-palenight"
      className="border border-slate-700 text-xl"
      {...props}
    />
  );
};

export default CodeSnippet;
