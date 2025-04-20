"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import { Orbitron } from "next/font/google";

// Font Imports
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bebasN = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const HeroCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  // Detect screen size and set image array
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;

      const mobileImages = [
        "/images/pp1.jpg",
        "/images/pp3.jpg",
        "/images/pp4.jpg",
        "/images/pp5.jpg",
        "/images/pp6.jpg",
        "/images/pp7.jpg",
        "/images/pp8.jpg",
        "/images/pp9.jpg",
        "/images/pp10.jpg",
        "/images/pp11.jpg",
        "/images/pp12.jpg",
        "/images/pp13.jpg",
      ];

      const desktopImages = [
        "/images/photo1.jpg",
        "/images/pl2.jpg",
        "/images/pl3.jpg",
        "/images/pl4.jpg",
        "/images/pl11.jpg",
        "/images/pl5.jpg",
        "/images/pl6.jpg",
        "/images/pl8.jpg",
        "/images/pl10.jpg",
      ];

      setImages(isMobile ? mobileImages : desktopImages);
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Change image every 5s
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <section
      id="hc"
      className="relative h-screen w-full overflow-hidden"
      aria-live="polite"
    >
      {/* Background Images */}
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`Carousel Image ${index + 1}`}
          layout="fill"
          objectFit="cover"
          loading={index === 0 ? "eager" : "lazy"}
          className={`absolute top-0 left-0 transition-all duration-1000 ease-in-out ${
            index === currentImageIndex
              ? "opacity-100 z-10 scale-105"
              : "opacity-0 z-0 scale-100"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Centered Text */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl mb-4">
          Welcome to
        </h1>
        <TypeAnimation
          sequence={[
            "RidingOnTheVerge",
            1000,
            "",
            500,
            "Bike.Travel.Explore.",
            1500,
            "",
            500,
            "RidingOnTheVerge",
          ]}
          wrapper="span"
          speed={40}
          repeat={Infinity}
          className={`${orbitron.className} text-3xl md:text-5xl text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.6)]`}
        />
        <a
          href="#about"
          className="mt-6 px-6 py-3 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition-shadow shadow-lg hover:shadow-red-600/40"
        >
          Explore More
        </a>
      </div>

      {/* Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white hover:text-red-500 hover:-translate-x-1 transition-all duration-300 ease-in-out"
        aria-label="Previous Image"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white hover:text-red-500 hover:translate-x-1 transition-all duration-300 ease-in-out"
        aria-label="Next Image"
      >
        <ChevronRight size={40} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full z-30 flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentImageIndex === i
                ? "bg-red-500 scale-110 shadow-md"
                : "bg-white/50 hover:bg-red-400"
            }`}
            aria-label={`Go to image ${i + 1}`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
