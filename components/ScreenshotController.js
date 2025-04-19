"use client";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

const ScreenshotController = ({ trigger }) => {
  const { gl } = useThree();

  useEffect(() => {
    if (trigger) {
      const link = document.createElement("a");
      link.download = "bike-scene.png";
      link.href = gl.domElement.toDataURL("image/png");
      link.click();
    }
  }, [trigger, gl]);

  return null;
};

export default ScreenshotController;
