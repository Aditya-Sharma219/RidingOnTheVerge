"use client";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Bike = () => {
  const { scene } = useGLTF("/models/bike.glb");
  const bikeRef = useRef();

  useEffect(() => {
    if (!bikeRef.current) return;

    const bike = bikeRef.current;

    // Glowing Headlights
    const lights = [0.4, -0.4].map((x) => {
      const light = new THREE.PointLight(0xffffff, 3, 5);
      light.position.set(x, 0.1, 1);
      bike.add(light);

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      glow.position.set(x, 0.1, 1);
      bike.add(glow);

      return [light, glow];
    });

    return () => {
      bike.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      });
    };
  }, []);

  return (
    <primitive
      ref={bikeRef}
      object={scene}
      scale={3}
      position={[0, -1.2, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

export default Bike;
