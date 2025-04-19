"use client";
import React, { useState, useRef, useEffect, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows, useProgress, Html } from "@react-three/drei";

// Bike Model with Disposal
const Bike = () => {
  const { scene } = useGLTF("/models/bike.glb");
  const bikeRef = useRef();

  // Dispose of the model to free up resources when it's no longer in view
  useEffect(() => {
    return () => {
      if (bikeRef.current) {
        bikeRef.current.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose(); // Dispose of geometry
            if (child.material.map) child.material.map.dispose(); // Dispose of textures
            child.material.dispose(); // Dispose of materials
          }
        });
      }
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

// Loading Overlay
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-center">
        <p className="mb-2">Loading Bike Model...</p>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm">{Math.floor(progress)}%</p>
      </div>
    </Html>
  );
};

// BikeCanvas Component with Unload on Scroll
const BikeCanvas = () => {
  const [isVisible, setIsVisible] = useState(true); // Initially set to true
  const canvasRef = useRef();

  // Handle the visibility of the canvas (when it enters or leaves the viewport)
  const handleVisibility = useCallback((entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting); // Update visibility when it's in view
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleVisibility, {
      root: null,
      threshold: 0.1, // Trigger visibility at 10%
    });

    if (canvasRef.current) {
      observer.observe(canvasRef.current); // Start observing the canvas
    }

    return () => {
      observer.disconnect(); // Cleanup observer
    };
  }, [handleVisibility]);

  // When not visible, dispose of the model
  useEffect(() => {
    if (!isVisible) {
      // Clean up resources when the model is out of view
      // You could call a function to trigger the disposal here if necessary
      console.log("Model is out of view, unloading resources...");
    }
  }, [isVisible]);

  return (
    <Canvas
      ref={canvasRef}
      shadows
      camera={{ position: [3, 2, 6], fov: 45 }}
      style={{ background: "black" }}
    >
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[5, 5, 5]}
        intensity={3}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        position={[-2, 0, -2]}
        angle={0.6}
        penumbra={2}
        intensity={3}
        castShadow
        color={"white"}
      />
      <pointLight
        position={[-3, 2, -2]}
        intensity={3}
        color="#8e44ad"
        distance={10}
      />

      {/* Model */}
      <Suspense fallback={<Loader />}>
        {isVisible && <Bike />}
        {isVisible && (
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.6}
            scale={40}
            blur={1.8}
            far={4}
          />
        )}
      </Suspense>

      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

// Main Scene with Overlay
const BikeScene = () => {
  const [start, setStart] = useState(false);

  return (
    <div className="w-full h-screen bg-black relative flex items-center justify-center">
      {!start && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
          <div className="text-center">
            <h1 className="text-white text-3xl font-semibold mb-6">🚴‍♂️ Ready to explore the bike?</h1>
            <button
              onClick={() => setStart(true)}
              className="bg-purple-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Play
            </button>
          </div>
        </div>
      )}

      {start && <BikeCanvas />}
    </div>
  );
};

export default BikeScene;
