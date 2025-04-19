"use client";
import React, { useState, useEffect, useRef } from "react";

const getRandomGradient = () => {
    const gradients = [
        "from-pink-500 to-yellow-500",
        "from-blue-400 to-purple-600",
        "from-green-400 to-blue-500",
        "from-red-400 to-orange-500",
        "from-teal-400 to-blue-500",
        "from-indigo-500 to-pink-500",
    ];
    const index = Math.floor(Math.random() * gradients.length);
    return gradients[index];
};

const Trips = () => {
    const scrollRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const words = ["Trips", "Journeys", "Adventures", "Escapes"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [prevWordIndex, setPrevWordIndex] = useState(null);  // Track previous word index
    const [gradient, setGradient] = useState(null);  // Initially null
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Generate a random gradient only on the client side
        setGradient(getRandomGradient());

        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => {
                setPrevWordIndex(currentWordIndex);  // Update the previous word
                setGradient(getRandomGradient());
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
                setAnimate(false);
            }, 600); // Animation time for word transition
        }, 4000);

        return () => clearInterval(interval);
    }, [currentWordIndex]);

    const destinations = [
        { name: "Goa", img: "/images/photo1.jpg" },
        { name: "Thar", img: "/images/photo2.jpg" },
        { name: "Pune", img: "/images/photo3.jpg" },
        { name: "Shimla", img: "/images/photo4.jpg" },
        { name: "Delhi", img: "/images/photo5.jpg" },
    ];
    const duplicatedDestinations = [...destinations, ...destinations];

    useEffect(() => {
        const container = scrollRef.current;
        const interval = setInterval(() => {
            if (container) {
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0;
                } else {
                    container.scrollLeft += 220;
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

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
                    <h1 className="text-5xl font-bold text-white flex items-baseline gap-3">
                        International{" "}
                        <span
                            className={`inline-block text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${gradient} transition-all duration-1000 transform ${animate ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
                                }`}
                        >
                            {words[currentWordIndex]}
                        </span>
                    </h1>
                    <p className="text-lg text-gray-100 mt-2">
                        Discover the world, one destination at a time
                    </p>
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

            {/* Trips Section */}
            <section className="bg-[#FFF7DB] py-12 px-4">
                <h2 className="text-6xl font-extrabold text-center text-gray-800 mb-10 
  relative overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                        Trips
                    </span>
                    <span className="relative group-hover:scale-105 group-hover:tracking-wide transition-all duration-500 ease-in-out">
                        Trips
                    </span>
                </h2>


                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto space-x-6 scrollbar-hide"
                    style={{ scrollBehavior: "smooth" }}
                >
                    {duplicatedDestinations.map((card, idx) => (
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

            {/* Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <button
                        className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-500 transition-colors duration-300"
                        onClick={() => setSelectedImage(null)}
                    >
                        &times;
                    </button>
                    <img
                        src={selectedImage}
                        alt="Destination"
                        className="w-full h-full object-contain rounded-lg shadow-xl transition-transform duration-500 transform scale-105 hover:scale-110"
                    />
                </div>
            )}
        </>
    );
};

export default Trips;
