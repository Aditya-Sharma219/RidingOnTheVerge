import React, { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DustParticles = memo(({ position }) => {
  const particleCount = 100;
  const particlesRef = useRef();

  const dustParticles = useRef(
    Array.from({ length: particleCount }, () => ({
      position: new THREE.Vector3(
        Math.random() * 0.5 - 0.25, // X
        Math.random() * 0.2, // Y
        Math.random() * 0.5 - 0.25 // Z
      ),
      speed: Math.random() * 0.02 + 0.01, // Speed of the dust
      size: Math.random() * 0.1 + 0.05, // Size of the dust particle
      rotation: Math.random() * Math.PI * 2 // Random rotation
    }))
  );

  useFrame(() => {
    dustParticles.current.forEach((particle) => {
      particle.position.y += particle.speed;
      if (particle.position.y > 2) {
        particle.position.y = Math.random() * 0.2;
        particle.position.x = Math.random() * 0.5 - 0.25;
        particle.position.z = Math.random() * 0.5 - 0.25;
      }
    });
  });

  return (
    <group position={position}>
      {dustParticles.current.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position}
          rotation={[particle.rotation, particle.rotation, particle.rotation]}
        >
          <sphereGeometry args={[particle.size, 6, 6]} />
          <meshStandardMaterial
            color="rgba(200, 200, 200, 0.7)"
            emissive="rgba(150, 150, 150, 0.5)"
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
});

export default DustParticles;
