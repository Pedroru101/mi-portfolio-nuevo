'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function EarthModel() {
  // Cargar el modelo 3D desde la carpeta public/planet
  const earth = useGLTF('./planet/scene.gltf');

  return (
    <primitive
      object={earth.scene}
      scale={16} // Incrementamos la escala un 50% para acercar el planeta al espectador
      position-y={0}
      rotation-y={0}
    />
  );
}

export default function EarthCanvas() {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000, // AJUSTE MANUAL: Aumenta este valor si el planeta se recorta al hacerlo muy grande
        position: [-2, 3, 8], // Alejamos la cámara para mostrar el planeta completo
      }}
    >
      <Suspense fallback={null}> {/* Muestra un fallback mientras carga el modelo */}
        <OrbitControls
          autoRotate // El planeta girará automáticamente
          autoRotateSpeed={0.3} // Velocidad de la rotación
          enableZoom={false} // Deshabilita el zoom con el mouse
          maxPolarAngle={Math.PI / 2} // Limita la rotación para no ver por debajo
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={1.25} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <EarthModel />
      </Suspense>
    </Canvas>
  );
}
