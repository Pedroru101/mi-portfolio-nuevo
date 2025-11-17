/**
 * Componente Earth - Visualización 3D del Planeta Tierra
 *
 * Este componente renderiza un modelo 3D interactivo de la Tierra usando Three.js.
 * El planeta rota automáticamente y está optimizado para ser usado como elemento
 * decorativo en el hero section del portfolio.
 *
 * Características:
 * - Rotación automática suave
 * - Modelo GLTF de alta calidad con texturas
 * - Controles de órbita deshabilitados para el usuario (solo rotación automática)
 * - Optimizado con lazy loading (no SSR)
 *
 * @component
 */

'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

/**
 * Componente interno que carga y renderiza el modelo 3D de la Tierra
 * @returns {JSX.Element} Modelo 3D del planeta
 */
function EarthModel() {
  // Cargar el modelo 3D desde la carpeta public/planet
  const earth = useGLTF('./planet/scene.gltf');

  return (
    <primitive
      object={earth.scene}
      scale={16} // Escala aumentada para hacer el planeta más prominente
      position-y={0}
      rotation-y={0}
    />
  );
}

/**
 * Canvas principal que contiene la escena 3D del planeta Tierra
 * @returns {JSX.Element} Canvas de Three.js con el modelo 3D
 */
export default function EarthCanvas() {
  return (
    <Canvas
      shadows
      frameloop="demand" // Renderiza solo cuando es necesario para ahorrar recursos
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000, // Distancia de renderizado lejana para evitar recortes
        position: [-2, 3, 8], // Posición de la cámara para una vista óptima
      }}
    >
      <Suspense fallback={null}>
        {/* OrbitControls gestiona la rotación automática del planeta */}
        <OrbitControls
          autoRotate // Rotación automática habilitada
          autoRotateSpeed={0.3} // Velocidad lenta y suave
          enableZoom={false} // Zoom deshabilitado para mantener la escala fija
          maxPolarAngle={Math.PI / 2} // Restricción de ángulo vertical
          minPolarAngle={Math.PI / 2}
        />
        {/* Iluminación ambiental suave */}
        <ambientLight intensity={1.25} />
        {/* Luz direccional para dar profundidad */}
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <EarthModel />
      </Suspense>
    </Canvas>
  );
}
