"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load react-three/fiber Canvas only on client
const CombinedScene = dynamic(() => import("./three/CombinedScene"), {
  ssr: false,
  loading: () => null,
});

export function ThreeBackground() {
  return (
    <Suspense fallback={null}>
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <CombinedScene />
      </div>
    </Suspense>
  );
}
