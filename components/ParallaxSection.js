"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Parallax Section component
const ParallaxSection = ({ imageUrl, heading, subheading, objectFit = "cover", quality = 100, color1, color2 }) => {
  const ref = React.useRef(null);

  // Scroll animation values
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with parallax motion */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={imageUrl}
          alt="Parallax Background"
          layout="fill"
          objectFit={objectFit}
          quality={quality}
          placeholder="blur" // Added placeholder for loading performance
        />
      </motion.div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30 z-10" /> {/* Softer overlay for better readability */}

      {/* Text Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <h2
          className="text-5xl md:text-6xl font-extrabold"
          style={{
            background: `linear-gradient(to right, ${color1}, ${color2})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",  // For Safari support
            color: "transparent",
            transition: "color 0.3s ease-in-out", // Optional: to make the color change smoothly
          }}
        >
          {heading}
        </h2>
        {subheading && (
          <p className="text-lg md:text-xl text-gray-100 mt-4 max-w-xl">
            {subheading}
          </p>
        )}
      </div>
    </section>
  );
};

// Parallax Page with 3 sections
const ParallaxPage = () => {
  return (
    <div>
      <ParallaxSection
        imageUrl="/images/photo1.jpg"
        heading="EXPLORATION WITH AN EDGE"
        subheading="Get to know about the Culture & Lifestyle of the Himalayas."
        color1="#FF6F61"
        color2="#D32F2F"
      />

      <ParallaxSection
        imageUrl="/images/photo2.jpg"
        heading="TEST YOUR METTLE"
        subheading="Conquer the toughest roads with us!"
        color1="#0288D1"
        color2="#1976D2"
      />

      <ParallaxSection
        imageUrl="/images/photo3.jpg"
        heading="LIVE ON THE VERGE"
        color1="#8E24AA"
        color2="#7B1FA2"
      />
    </div>
  );
};

export default ParallaxPage;
