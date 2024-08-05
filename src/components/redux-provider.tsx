"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { AppStore, makeStore } from "@/store";
import { setTheme } from "@/store/app-slice";

interface Props {
  children: React.ReactNode;
  theme: "light" | "dark";
}

export default function ReduxProvider({ children, theme }: Props) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(setTheme(theme));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
