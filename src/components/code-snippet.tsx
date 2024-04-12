import { Code } from "bright";

const CodeSnippet = (props: any) => {
  return (
    <Code
      theme="material-palenight"
      className="code-block border border-slate-700 text-xl"
      {...props}
    />
  );
};

export default CodeSnippet;
