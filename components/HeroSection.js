"use client";
import React from "react";

const HeroSection = () => {
    return (
        <section className="relative z-20 bg-cover bg-center bg-[url('/images/hero-bg.jpg')] py-16 md:py-24">

            {/* Light Overlay */}
            <div className="absolute inset-0 bg-white bg-opacity-60 z-0" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center text-black px-4">
                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-800">
                    Ride Beyond Limits
                </h1>

                {/* Description */}
                <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl">
                    Dive into the world of two wheels – thrilling adventures, honest reviews,
                    and real-life biking experiences. Whether you're a beginner or a pro rider,
                    you'll find something to fuel your passion here.
                </p>

                {/* YouTube Video Iframes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
                    {[
                        {
                            src: "https://www.youtube.com/embed/YUHfCWq6mzk?si=5Vo7S1Vmx5tUFSj7",
                            title: "Royal Enfield Classic 350 Exhaust & Vibes Review",
                        },
                        {
                            src: "https://www.youtube.com/embed/emRa8SVp9Ss?si=6Okdtq-ja-78NhN6",
                            title: "Top 5 Bikes for Beginners in 2024",
                        },
                        {
                            src: "https://www.youtube.com/embed/E5zZoOlgwY8?si=_b6Ng0MCh_3gqGX_",
                            title: "Solo Ride to Mountains – Complete Vlog",
                        },
                        {
                            src: "https://www.youtube.com/embed/wiQLyfVIN10?si=sltu-8y9IxliMv2K",
                            title: "Best Helmet for Riders under ₹5000",
                        },
                    ].map((video, index) => (
                        <div key={index} className="w-full h-[280px] md:h-[360px] lg:h-[450px]">
                            <iframe
                                src={video.src}
                                title={video.title}
                                className="w-full h-full border-0 rounded-lg shadow-lg"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
