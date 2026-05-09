"use client";

import { Suspense, lazy } from "react";

const Canvas = lazy(() =>
  import("@react-three/fiber").then((m) => ({ default: m.Canvas }))
);
const Float = lazy(() =>
  import("@react-three/drei").then((m) => ({ default: m.Float }))
);
const MeshDistortMaterial = lazy(() =>
  import("@react-three/drei").then((m) => ({ default: m.MeshDistortMaterial }))
);
const Environment = lazy(() =>
  import("@react-three/drei").then((m) => ({ default: m.Environment }))
);

import { useMousePosition } from "@/lib/hooks/useMousePosition";

/* ------------------------------------------------------------------ */
/*  Detect low-power devices so we can skip the heavy WebGL canvas    */
/* ------------------------------------------------------------------ */
function getIsLowPowerDevice(): boolean {
  if (typeof window === "undefined") return false;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const lowMem = nav.deviceMemory !== undefined && nav.deviceMemory <= 2;
  const conn = nav.connection;
  const slowConn = conn && (conn.saveData || /2g|slow-2g/.test(conn.effectiveType ?? ""));
  return mq.matches || lowMem || !!slowConn;
}

/* ------------------------------------------------------------------ */
/*  Single floating shape                                             */
/* ------------------------------------------------------------------ */
function FloatingShape({
  position,
  geometry,
  color,
  speed = 1,
  distort = 0.2,
  scale = 1,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "torus" | "octahedron" | "dodecahedron";
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}) {
  return (
    <Float
      speed={speed}
      rotationIntensity={0.6}
      floatIntensity={1.2}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh position={position} scale={scale}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.8, 0.3, 16, 32]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {geometry === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/*  Mouse-reactive subtle camera group                                */
/* ------------------------------------------------------------------ */
function MouseReactiveGroup() {
  const mouse = useMousePosition();
  return (
    <group
      rotation={[
        mouse.y * 0.08, // subtle tilt on Y mouse
        mouse.x * 0.12, // subtle pan on X mouse
        0,
      ]}
    >
      <FloatingShape
        position={[-3.5, 1.5, -2]}
        geometry="icosahedron"
        color="#6366f1"
        scale={0.9}
        distort={0.25}
        speed={0.8}
      />
      <FloatingShape
        position={[3.2, -1, -3]}
        geometry="torus"
        color="#ec4899"
        scale={1.1}
        distort={0.15}
        speed={0.6}
      />
      <FloatingShape
        position={[0, 2.5, -4]}
        geometry="octahedron"
        color="#06b6d4"
        scale={0.7}
        distort={0.3}
        speed={1}
      />
      <FloatingShape
        position={[-2, -2.5, -1]}
        geometry="dodecahedron"
        color="#f59e0b"
        scale={0.6}
        distort={0.2}
        speed={0.7}
      />
      <FloatingShape
        position={[2.5, 2, -5]}
        geometry="icosahedron"
        color="#8b5cf6"
        scale={0.5}
        distort={0.35}
        speed={1.2}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Static fallback for low-power / reduced-motion devices            */
/* ------------------------------------------------------------------ */
function StaticFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-500/8 blur-3xl" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading placeholder                                               */
/* ------------------------------------------------------------------ */
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-500" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported Scene3D component                                        */
/* ------------------------------------------------------------------ */
export default function Scene3D() {
  const isLowPower = getIsLowPowerDevice();

  if (isLowPower) {
    return <StaticFallback />;
  }

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          dpr={[1, 1.5]} // cap DPR for performance
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, 2]} intensity={0.4} color="#ec4899" />
          <MouseReactiveGroup />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}
