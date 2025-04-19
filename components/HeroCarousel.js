// components/HeroCarousel.jsx
"use client";
import React, { useState, useEffect } from "react";

const HeroCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg", // Add as many image paths as needed
  ];

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={images[currentImageIndex]}
        alt="Carousel Image"
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Centered Text */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Welcome to <br />
          <span className="text-red-600">RidingOnTheVerge</span>
        </h1>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20"
      >
        &#10094;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20"
      >
        &#10095;
      </button>
    </section>
  );
};

export default HeroCarousel;
