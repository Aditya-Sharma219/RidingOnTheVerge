"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const Trips = () => {
    const scrollRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const scrollIntervalRef = useRef(null);

    const images = [
        "/images/photo1.jpg", "/images/photo2.jpg", "/images/photo3.jpg", "/images/photo4.jpg",
        "/images/photo5.jpg", "/images/pp14.jpg", "/images/pl1.jpg", "/images/pl2.jpg", "/images/pl3.jpg",
        "/images/pl4.jpg", "/images/pl5.jpg", "/images/pl9.jpg", "/images/pp1.jpg", "/images/pp3.jpg",
        "/images/pp5.jpg", "/images/pp8.jpg", "/images/pp6.jpg", "/images/pp7.jpg", "/images/pp9.jpg",
        "/images/pp10.jpg", "/images/pp11.jpg", "/images/pp12.jpg", "/images/bike5.jpg", "/images/bike6.jpg",
        "/images/pp13.jpg",
    ];

    const scrollStep = 350; // pixel width to scroll at each step
    const scrollDelay = 3000; // time in ms between scrolls

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollImages = () => {
            if (!container) return;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            if (container.scrollLeft + scrollStep >= maxScrollLeft) {
                // Reset to beginning
                container.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                // Scroll to next step
                container.scrollBy({ left: scrollStep, behavior: "smooth" });
            }
        };

        if (!isHovered) {
            scrollIntervalRef.current = setInterval(scrollImages, scrollDelay);
        }

        return () => clearInterval(scrollIntervalRef.current);
    }, [isHovered]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        clearInterval(scrollIntervalRef.current);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleImageClick = (img) => setSelectedImage(img);

    return (
        <section className="bg-[#FFF7DB] py-12 px-4">
            {/* Heading */}
            <h2 className="text-5xl md:text-6xl font-extrabold text-center text-gray-800 mb-10 relative group">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                    Trips
                </span>
                <span className="relative group-hover:scale-105 group-hover:tracking-wider transition-all duration-500 ease-in-out">
                    Trips
                </span>
            </h2>

            {/* Carousel */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-4 px-1 sm:px-4 scrollbar-hide scroll-smooth"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {images.map((img, idx) => (
                    <ImageCard key={idx} img={img} onClick={handleImageClick} />
                ))}
            </div>

            {/* Info Text */}
            <p className="text-center text-sm text-gray-500 mt-4 italic">
                📸 Click on any image to view full size
            </p>

            {/* Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-500 transition-colors duration-300"
                            onClick={() => setSelectedImage(null)}
                        >
                            &times;
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Full View"
                            className="w-full h-full max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-xl transition-transform duration-500 transform scale-105 hover:scale-110"
                            width={1200}
                            height={800}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

const ImageCard = ({ img, onClick }) => (
    <div
        className="min-w-[220px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[360px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300 hover:scale-[1.05]"
        onClick={() => onClick(img)}
    >
        <Image
            src={img}
            alt="Trip"
            className="w-full h-[220px] sm:h-[280px] md:h-[330px] object-cover transition-transform duration-300 hover:scale-110"
            width={360}
            height={360}
        />
    </div>
);

export default Trips;
