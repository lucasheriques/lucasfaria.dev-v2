"use client";

import { MotionConfig } from "framer-motion";
import React from "react";

function RespectMotionPreferences({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export default RespectMotionPreferences;
