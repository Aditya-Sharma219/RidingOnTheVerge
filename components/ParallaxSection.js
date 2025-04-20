"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Single Section with Parallax
const ParallaxSection = ({ desktopImageUrl, mobileImageUrl, heading, subheading, objectFit = "cover", quality = 100 }) => {
  const ref = React.useRef(null);

  // Scroll position tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect with smooth scroll transition
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Image that moves along scroll */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        {/* Responsive Image: Conditional for mobile and desktop */}
        <picture>
          {/* For mobile, use pp1, pp2, etc */}
          <source media="(max-width: 768px)" srcSet={mobileImageUrl} />
          {/* For desktop, use photo4, photo2, etc */}
          <Image
            src={desktopImageUrl}
            alt="Parallax Background"
            layout="fill"
            objectFit={objectFit}
            quality={quality}
          />
        </picture>
      </motion.div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Text Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {heading}
        </motion.h2>
        {subheading && (
          <motion.p
            className="text-lg md:text-xl text-white max-w-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {subheading}
          </motion.p>
        )}
      </div>
    </section>
  );
};

// Page with 3 sections
const ParallaxPage = () => {
  return (
    <div>
      <ParallaxSection
        desktopImageUrl="/images/photo4.jpg" // Desktop version image
        mobileImageUrl="/images/pp3.jpg" // Mobile version image
        heading="EXPLORATION WITH AN EDGE"
        subheading="Get to know about the Culture & Lifestyle of the Himalayas."
      />
      <ParallaxSection
        desktopImageUrl="/images/photo2.jpg" // Desktop version image
        mobileImageUrl="/images/pp1.jpg" // Mobile version image
        heading="TEST YOUR METTLE"
        subheading="Conquer the toughest roads with us!"
      />
      <ParallaxSection
        desktopImageUrl="/images/pl5.jpg" // Desktop version image
        mobileImageUrl="/images/pl5.jpg" // Mobile version image
        heading="LIVE ON THE VERGE"
      />
    </div>
  );
};

export default ParallaxPage;
