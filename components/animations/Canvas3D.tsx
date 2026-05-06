"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Mesh, Group } from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Individual floating geometric shape with rotation and floating animation.
 */
function FloatingShape({
  position,
  color,
  speed = 1,
  scale = 1,
  geometry,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  scale?: number;
  geometry: "icosahedron" | "octahedron" | "torus" | "dodecahedron";
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  const GeometryComponent = {
    icosahedron: <icosahedronGeometry args={[1, 0]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    torus: <torusGeometry args={[0.7, 0.3, 16, 32]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
  };

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {GeometryComponent[geometry]}
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

/**
 * Seeded pseudo-random number generator for deterministic particle positions.
 * Uses a simple mulberry32 algorithm so positions are stable across renders.
 */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PARTICLE_COUNT = 50;
const PARTICLE_POSITIONS: [number, number, number][] = (() => {
  const rng = seededRandom(42);
  const pts: [number, number, number][] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pts.push([(rng() - 0.5) * 20, (rng() - 0.5) * 20, (rng() - 0.5) * 20]);
  }
  return pts;
})();

/**
 * Particle field for ambient background depth.
 */
function ParticleField() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {PARTICLE_POSITIONS.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#8b5cf6" : "#d946ef"}
            transparent
            opacity={0.4}
            emissive={i % 2 === 0 ? "#8b5cf6" : "#d946ef"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * 3D Canvas Scene
 * Renders floating geometric shapes and a particle field.
 * Uses @react-three/fiber and @react-three/drei.
 */
export default function Canvas3D() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#d946ef" />

        <FloatingShape
          position={[-3, 2, -2]}
          color="#8b5cf6"
          speed={0.8}
          scale={0.6}
          geometry="icosahedron"
        />
        <FloatingShape
          position={[3.5, -1.5, -3]}
          color="#d946ef"
          speed={0.6}
          scale={0.5}
          geometry="octahedron"
        />
        <FloatingShape
          position={[-2, -2.5, -4]}
          color="#06b6d4"
          speed={0.5}
          scale={0.4}
          geometry="torus"
        />
        <FloatingShape
          position={[2.5, 2.5, -5]}
          color="#f472b6"
          speed={0.7}
          scale={0.35}
          geometry="dodecahedron"
        />

        {!prefersReduced && <ParticleField />}
      </Canvas>
    </div>
  );
}
