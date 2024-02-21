"use server";

import { cookies } from "next/headers";

export async function setLittleHomeDisplayAnimation() {
  cookies().set("playLittleHomeAnimation", "true", {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10),
  });
}

export async function setThemeCookie(theme: "light" | "dark") {
  cookies().set("theme", theme, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10),
  });
}
