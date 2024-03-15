"use client";

import dynamic from "next/dynamic";

const KubernetesVisualizer = dynamic(() => import("./kubernetes-visualizer"));

export default KubernetesVisualizer;
