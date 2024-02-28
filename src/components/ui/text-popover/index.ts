import dynamic from "next/dynamic";

const TextPopover = dynamic(() => import("./text-popover"));

export default TextPopover;
