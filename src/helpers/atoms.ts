import { atom } from "jotai";

export const currentHeadingAtom = atom<string | null>(
  window.location.hash.slice(1) || null,
);
