"use client";

import { useEffect } from "react";

import { setCurrentHeading } from "@/store/app-slice";
import { useAppDispatch } from "@/store/hooks";

export default function ResetHeading() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setCurrentHeading("introduction"));
    };
  }, [dispatch]);

  return null;
}
