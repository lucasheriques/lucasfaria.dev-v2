"use client";

import { useSetAtom } from "jotai";
import * as React from "react";

import { currentHeadingAtom } from "@/helpers/atoms";

export default function ResetHeading() {
  const setHeading = useSetAtom(currentHeadingAtom);

  React.useEffect(() => {
    return () => {
      setHeading("introduction");
    };
  }, [setHeading]);

  return null;
}
