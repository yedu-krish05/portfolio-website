import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Icosahedron } from '@react-three/drei';

function FloatingShape() {
  const meshRef = useRef();
  const innerMeshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.15;
      innerMeshRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {/* Outer Cyan Wireframe */}
      <Icosahedron ref={meshRef} args={[1, 1]} scale={2.5}>
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.15} />
      </Icosahedron>
      
      {/* Inner Blue Wireframe */}
      <Icosahedron ref={innerMeshRef} args={[1, 1]} scale={1.8}>
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.25} />
      </Icosahedron>
    </Float>
  );
}

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 print:hidden overflow-hidden opacity-70">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <Stars radius={50} depth={50} count={2500} factor={4} saturation={0} fade speed={1.5} />
        <FloatingShape />
      </Canvas>
      
      {/* Overlay gradient to fade the bottom into the black background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10 pointer-events-none" />
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none" />
    </div>
  );
}
