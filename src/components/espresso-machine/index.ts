"use client";

import dynamic from "next/dynamic";

const EspressoMachine = dynamic(() => import("./espresso-machine"));

export default EspressoMachine;
