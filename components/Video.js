// Video.jsx
"use client";
import React, { useState, useEffect, useCallback } from "react";

const Video = () => {
    const [gradient, setGradient] = useState(null);
    const [animate, setAnimate] = useState(false);

    const words = ["Trips", "Journeys", "Adventures", "Escapes"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const getRandomGradient = useCallback(() => {
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
    }, []);

    useEffect(() => {
        setGradient(getRandomGradient());

        const interval = setInterval(() => {
            setAnimate(true);
            setTimeout(() => {
                setGradient(getRandomGradient());
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
                setAnimate(false);
            }, 600);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentWordIndex, words.length, getRandomGradient]);

    return (
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
                <h1 className="text-4xl md:text-5xl font-bold text-white flex flex-col md:flex-row items-baseline gap-3">
                    International
                    <span
                        className={`inline-block text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${gradient} transition-all duration-1000 transform ${animate ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"
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
    );
};

export default Video;
