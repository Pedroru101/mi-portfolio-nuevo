"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";



function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 3000; i++) {
      const r = Math.random() * 100;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points positions={sphere} ref={ref} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00bfff"
        size={0.25}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.15}
      />
    </Points>
  );
}

export default function CombinedScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 75 }}
      shadows
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={1.25} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={<mesh><sphereGeometry args={[10,32,32]} /><meshStandardMaterial color="#222" /></mesh>}>
        <Particles />
      </Suspense>
    </Canvas>
  );
}
