"use client";
import { Html, useProgress } from "@react-three/drei";

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

export default Loader;
