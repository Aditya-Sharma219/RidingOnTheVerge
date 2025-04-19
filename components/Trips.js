"use client";
import React, { useState } from 'react'

const Trips = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const destinations = [
        { name: 'Europe', img: '/images/photo1.jpg' },
        { name: 'Vietnam', img: '/images/photo2.jpg' },
        { name: 'Bali', img: '/images/photo3.jpg' },
        { name: 'Thailand', img: '/images/photo4.jpg' },
        { name: 'Turkey', img: '/images/photo5.jpg' },
    ];

    return (
        <>
            {/* Hero Section */}
            <section id='gallery' className="relative h-[80vh] overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="/videos/hero-video.mp4" type="video/mp4" />
                </video>

                <div className="relative z-10 flex flex-col justify-center items-start h-full px-8 bg-black/40">
                    <h1 className="text-5xl font-bold text-white">International Trips</h1>
                    <p className="text-lg text-gray-100 mt-2">Discover the world, one destination at a time</p>
                    <a
                        href="https://www.youtube.com/@RidingOnTheVerge/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 ease-in-out"
                    >
                        🚀 Explore Now
                    </a>
                </div>
            </section>

            {/* Cards Section */}
            <section className="bg-[#FFF7DB] py-12 px-4">
                <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
                    {destinations.map((card, idx) => (
                        <div
                            key={idx}
                            className="min-w-[220px] bg-white rounded-xl overflow-hidden shadow-lg relative cursor-pointer"
                            onClick={() => setSelectedImage(card.img)}
                        >
                            <img
                                src={card.img}
                                alt={card.name}
                                className="w-full h-[300px] object-cover"
                            />
                            <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                                <h2 className="text-xl font-bold">{card.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Fullscreen Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <button
                        className="absolute top-6 right-6 text-white text-3xl font-bold"
                        onClick={() => setSelectedImage(null)}
                    >
                        &times;
                    </button>
                    <img
                        src={selectedImage}
                        alt="Enlarged Destination"
                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-xl"
                    />
                </div>
            )}
        </>
    )
}

export default Trips
