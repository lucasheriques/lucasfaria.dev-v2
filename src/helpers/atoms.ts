import { atom } from "jotai";

export const currentHeadingAtom = atom<string>("introduction");
export const postLanguageAtom = atom<"en" | "pt-br">("en");
export const sandboxActiveView = atom<"preview" | "console">("preview");
