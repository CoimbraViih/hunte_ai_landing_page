"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Points() {
  const ref = useRef<THREE.Points>(null);
  const count = 800;

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      array[i * 3] = (Math.random() - 0.5) * 10;
      array[i * 3 + 1] = (Math.random() - 0.5) * 10;
      array[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return array;
  }, []);

  // Depth cue: points closer to the camera (larger z, since camera sits at
  // z=5 looking toward the origin) get a brighter shade of signal-green;
  // points further away get dimmer. Baked into a per-point color attribute
  // so a single pointsMaterial with vertexColors can render varying
  // brightness without a custom shader.
  const colors = useMemo(() => {
    const array = new Float32Array(count * 3);
    const base = new THREE.Color("#2EE6A0");
    for (let i = 0; i < count; i++) {
      const z = positions[i * 3 + 2]; // range: [-5, 5]
      const depthT = (z + 5) / 10; // 0 = furthest, 1 = closest
      const brightness = 0.45 + depthT * 0.55; // keep a visible floor, no near-zero dimming
      array[i * 3] = base.r * brightness;
      array[i * 3 + 1] = base.g * brightness;
      array[i * 3 + 2] = base.b * brightness;
    }
    return array;
  }, [positions]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleChange() {
      setPrefersReducedMotion(media.matches);
    }

    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useFrame((_, delta) => {
    if (prefersReducedMotion) return;
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
        <Points />
      </Canvas>
    </div>
  );
}
