"use client";

import dynamic from "next/dynamic";

const KubernetesVisualizer = dynamic(() => import("./kubernetes-visualizer"), {
  ssr: false,
});

export default KubernetesVisualizer;
