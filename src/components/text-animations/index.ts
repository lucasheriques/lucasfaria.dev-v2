"use client";

import dynamic from "next/dynamic";

const SparklesText = dynamic(() => import("./sparkles-text"));
const TypingText = dynamic(() => import("./typing-text"));

export { SparklesText, TypingText };
