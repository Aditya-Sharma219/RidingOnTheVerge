"use client";

import HeroCarousel from "@/components/HeroCarousel";
import HeroSection from "@/components/HeroSection";
import Trips from "@/components/Trips";
import ParallaxSection from "@/components/ParallaxSection";
import "./globals.css";
import Footer from "@/components/Footer";
import About from "@/components/About";
import BikeScene from "@/components/BikeScene";

// ❌ REMOVE this: import AnimatedCursor from "react-animated-cursor";

// ✅ Use dynamic import (no SSR)
import dynamic from "next/dynamic";
const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <AnimatedCursor
        innerSize={10}
        outerSize={40}
        color="255, 215, 0"
        outerAlpha={0.4}
        innerScale={1.5}
        outerScale={2.2}
        trailingSpeed={8}
        clickables={["a", "button", ".link", ".custom-cursor-target"]}
      />

      <HeroCarousel />
      <HeroSection />
      <Trips />
      <About />
      <BikeScene />
      <ParallaxSection />
      <Footer />
    </>
  );
}
