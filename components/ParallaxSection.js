"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxSection = ({ imageUrl, heading, subheading }) => {
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
          objectFit="cover"
          quality={100}
        />
      </motion.div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Text Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white">{heading}</h2>
        {subheading && (
          <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-xl">
            {subheading}
          </p>
        )}
      </div>
    </section>
  );
};

export default ParallaxSection;
