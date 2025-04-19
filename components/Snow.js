"use client";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Snow = () => {
  const snowflakesRef = useRef();

  const particleCount = 100; // 100 snowflakes
  const snowflakes = useMemo(() => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        position: new THREE.Vector3(
          Math.random() * 20 - 10,
          Math.random() * 20 + 10,  // Start higher so they fall down
          Math.random() * 20 - 10
        ),
        size: Math.random() * 1.5 + 1.5,  // Make snowflakes a bit bigger
        velocity: new THREE.Vector3(0, -0.05, 0),
      });
    }
    return particles;
  }, []);

  // This will move the snowflakes downward and reset their position when they go below the camera view
  useFrame(() => {
    if (!snowflakesRef.current) return;
    const snowflakes = snowflakesRef.current.children;
    snowflakes.forEach((snowflake) => {
      snowflake.position.add(snowflake.velocity);
      if (snowflake.position.y < -10) {
        snowflake.position.y = 10;  // Reset snowflake position
      }
    });
  });

  return (
    <group ref={snowflakesRef}>
      {snowflakes.map((snowflake, index) => (
        <mesh
          key={index}
          position={snowflake.position}
          scale={[snowflake.size, snowflake.size, snowflake.size]}
        >
          <sphereGeometry args={[1, 8, 8]} /> {/* Use spheres for snowflakes */}
          <meshStandardMaterial
            color="white"
            emissive="white"   // Add glow effect
            emissiveIntensity={0.6}  // Make them glow more
          />
        </mesh>
      ))}
    </group>
  );
};

export default Snow;
