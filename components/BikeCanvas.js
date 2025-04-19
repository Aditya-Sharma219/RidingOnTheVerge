"use client";
import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import Bike from "./Bike";
import Snow from "./Snow";
import Loader from "./Loader";

const BikeCanvas = () => {
  const [isVisible, setIsVisible] = useState(true); // Managing visibility of bike
  const [start, setStart] = useState(false); // Start state for the bike scene
  const canvasRef = useRef();

  const handleVisibility = useCallback((entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting); // Update visibility when element intersects
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleVisibility, {
      root: null,
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
      style={{ background: "black" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
      <spotLight position={[-2, 0, -2]} angle={0.6} penumbra={2} intensity={3} castShadow />
      <pointLight position={[-3, 2, -2]} intensity={3} color="#8e44ad" distance={10} />

      <Suspense fallback={<Loader />}>
        {start && isVisible && <Bike />}
        {start && isVisible && (
          <ContactShadows position={[0, -1.4, 0]} opacity={0.6} scale={40} blur={1.8} far={4} />
        )}
      </Suspense>

      <OrbitControls enableZoom />
      {start && isVisible && <Snow />} {/* Snowflakes falling only after start */}
    </Canvas>
  );
};

export default BikeCanvas;
