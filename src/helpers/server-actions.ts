"use server";

import { cookies } from "next/headers";

export async function setLittleHomeDisplayAnimation() {
  cookies().set("playLittleHomeAnimation", "true");
}
