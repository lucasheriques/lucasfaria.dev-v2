import dynamic from "next/dynamic";

const CodePlayground = dynamic(() => import("./sandpack-wrapper"));

export default CodePlayground;
