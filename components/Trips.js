"use client";
import React, { useState, useEffect, useRef } from "react";

// Function to generate random gradient colors
const getRandomGradient = () => {
  const colors = [
    "from-pink-500 to-yellow-500",
    "from-blue-400 to-purple-600",
    "from-green-400 to-blue-500",
    "from-red-400 to-orange-500",
    "from-teal-400 to-blue-500",
    "from-indigo-500 to-pink-500",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Trips = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [randomGradient, setRandomGradient] = useState(""); // Start with an empty string
  const [textOffset, setTextOffset] = useState(0);

  const destinations = [
    { name: "Goa", img: "/images/photo1.jpg" },
    { name: "Thar", img: "/images/photo2.jpg" },
    { name: "Pune", img: "/images/photo3.jpg" },
    { name: "Shimla", img: "/images/photo4.jpg" },
    { name: "Delhi", img: "/images/photo5.jpg" },
  ];

  const extendedDestinations = [...destinations, ...destinations]; // Duplicate the array for infinite loop

  const scrollContainerRef = useRef(null); // Ref to the scroll container

  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-scroll effect for cards
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const maxScrollLeft = scrollContainerRef.current.scrollWidth / 2; // Half of the container (after duplication)
        if (scrollContainerRef.current.scrollLeft < maxScrollLeft) {
          scrollContainerRef.current.scrollLeft += 220; // Scroll by card width
        } else {
          scrollContainerRef.current.scrollLeft = 0; // Reset to the start
        }
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Animate text offset and change gradient color over time
  useEffect(() => {
    // Delay the setting of the random gradient to only after the component has mounted
    setRandomGradient(getRandomGradient());

    const textAnimationInterval = setInterval(() => {
      setTextOffset((prevOffset) => (prevOffset === 100 ? 0 : 100)); // Toggle between 0 and 100 for slide effect
      setRandomGradient(getRandomGradient()); // Change gradient color
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(textAnimationInterval); // Clear the interval when component unmounts
  }, []); // Empty dependency array ensures it only runs after component mount

  return (
    <>
      {/* Hero Section */}
      <section id="gallery" className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 flex flex-col justify-center items-start h-full px-8 bg-black/40">
          <h1 className="text-5xl font-bold text-white">
            International
            <span
              className={`block text-5xl font-extrabold ${randomGradient} transition-all duration-1000 z-10`}
              style={{
                transform: `translateY(${textOffset}%)`,
                opacity: textOffset === 0 ? 1 : 0,
                zIndex: textOffset === 0 ? 10 : 0, // Ensure it's visible when moving down
              }}
            >
              Trips
            </span>
          </h1>
          <p className="text-lg text-gray-100 mt-2">Discover the world, one destination at a time</p>
          <a
            href="https://www.youtube.com/@RidingOnTheVerge/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:opacity-90"
          >
            🚀 Explore Now
          </a>
        </div>
      </section>

      {/* Trips Section Heading */}
      <section className="bg-[#FFF7DB] py-12 px-4">
        <h2 className="text-6xl font-bold text-center text-gray-800 mb-8">Trips</h2>

        {/* Cards Section with auto-scrolling */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 scrollbar-hide"
          style={{
            scrollBehavior: "smooth", // Smooth scrolling effect
          }}
        >
          {extendedDestinations.map((card, idx) => (
            <div
              key={idx}
              className="min-w-[350px] bg-white rounded-xl overflow-hidden shadow-lg relative cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => setSelectedImage(card.img)}
            >
              <img
                src={card.img}
                alt={card.name}
                className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                <h2 className="text-2xl font-semibold">{card.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out">
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-500 transition-colors duration-300"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <img
            src={selectedImage}
            alt="Enlarged Destination"
            className="w-full h-full object-contain rounded-lg shadow-xl transition-transform duration-500 transform scale-105 hover:scale-110"
          />
        </div>
      )}
    </>
  );
};

export default Trips;
