import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const currentHeadingAtom = atom<string>("introduction");
export const postLanguageAtom = atom<"en" | "pt-br">("en");
export const displayLittleHomeAnimation = atomWithStorage(
  "displayAnimation",
  true,
);
