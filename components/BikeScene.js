"use client";
import React, {
  useState,
  useRef,
  useEffect,
  Suspense,
  memo,
  useCallback,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  useProgress,
  Html,
  Instances,
  Instance,
} from "@react-three/drei";
import * as THREE from "three";
// import DustParticles from "./DustParticles";

// ✅ Bike Model (with proper cleanup)
const Bike = memo(() => {
  const { scene } = useGLTF("/models/bike.glb");
  const bikeRef = useRef();

  useEffect(() => {
    return () => {
      bikeRef.current?.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      });
    };
  }, []);

  useFrame(() => {
    if (bikeRef.current) {
      // Rotate the bike around the Y-axis at a medium speed (change the value to adjust speed)
      bikeRef.current.rotation.y += 0.01; // Adjust the speed as needed
    }
  });

  return (
    <primitive
      ref={bikeRef}
      object={scene}
      scale={3}
      position={[0, -1.2, 0]}
      rotation={[0, Math.PI, 0]} // Initial rotation to set the bike's orientation
    />
  );
});


// ❄️ Optimized Snowfall using Instancing
// ❄️ Enhanced Snowfall with Even Spread + Glow
const Snow = memo(() => {
  const snowCount = 250;
  const snowData = useRef(
    Array.from({ length: snowCount }, (_, i) => {
      const gridSize = 10;
      const spacing = 1.5;
      const x = ((i % gridSize) - gridSize / 2) * spacing + (Math.random() - 0.5);
      const z = (Math.floor(i / gridSize) - gridSize / 2) * spacing + (Math.random() - 0.5);
      const y = Math.random() * 10;
      return {
        pos: new THREE.Vector3(x, y, z),
        speed: 0.01 + Math.random() * 0.02,
      };
    })
  );

  const refs = useRef([]);

  useFrame(() => {
    snowData.current.forEach((snow, i) => {
      snow.pos.y -= snow.speed;
      if (snow.pos.y < -2) snow.pos.y = 10 + Math.random() * 5;
      refs.current[i]?.position.copy(snow.pos);
    });
  });

  return (
    <Instances limit={snowCount}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={1.5}
        toneMapped={false}
      />
      {snowData.current.map((snow, i) => (
        <Instance key={i} ref={(el) => (refs.current[i] = el)} />
      ))}
    </Instances>
  );
});


// ⏳ Loader UI
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-center">
        <p className="mb-2 font-medium">Loading Bike Model...</p>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-300">{Math.floor(progress)}%</p>
      </div>
    </Html>
  );
};

// 🎥 Bike + Snow + Shadows Canvas
const BikeCanvas = () => {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef();

  const handleVisibility = useCallback((entries) => {
    setIsVisible(entries[0].isIntersecting);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleVisibility, {
      threshold: 0.1,
    });
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [handleVisibility]);

  return (
    <Canvas
      ref={canvasRef}
      shadows
      camera={{ position: [3, 2, 6], fov: 45 }}
      className="w-full h-full"
    >
      {/* 🌟 Scene Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[-3, 5, -2]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <pointLight position={[2, 1, 1]} intensity={3.5} color="#9b59b6" />

      {/* 🌨️ Snow + Bike + Shadow */}
      <Suspense fallback={<Loader />}>
        <Snow />
        {isVisible && (
          <>
            <Bike />
            {/* Dust particles below the bike */}
            
            <ContactShadows
              position={[0, -1.4, 0]}
              scale={40}
              blur={1.6}
              far={4}
              opacity={0.5}
            />
          </>
        )}
      </Suspense>


      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

// 🚴‍♂️ Main Scene with Start Screen
const BikeScene = () => {
  const [start, setStart] = useState(false);
  const engineSound = useRef(null);
  const raceSound = useRef(null);
  const hasPlayed = useRef(false);

  const handleStart = () => {
    if (start || hasPlayed.current) return;

    setStart(true);
    hasPlayed.current = true;

    if (engineSound.current && raceSound.current) {
      engineSound.current.play();

      const handleEngineEnd = () => {
        raceSound.current.play(); // ▶️ Play once
        engineSound.current.removeEventListener("ended", handleEngineEnd);
      };

      engineSound.current.addEventListener("ended", handleEngineEnd);
    }
  };



  return (
    <div
      id="game"
      className="w-full h-screen relative bg-black overflow-hidden flex items-center justify-center"
    >
      {/* 🔊 Hidden audio elements */}
      <audio ref={engineSound} src="/sounds/engine.mp3" preload="auto" />
      <audio
        ref={raceSound}
        src="/sounds/race.mp3"
        preload="auto"

      />

      {!start && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-90">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-8">
            🚴 Ready to Ride?
          </h1>
          <button
            onClick={handleStart}
            className="bg-purple-600 cursor-pointer px-8 py-4 rounded-full text-white text-lg font-semibold hover:bg-purple-700 transition-all shadow-lg"
          >
            Start 3D Experience
          </button>
        </div>
      )}
      {start && <BikeCanvas />}
    </div>
  );
};

export default BikeScene;
