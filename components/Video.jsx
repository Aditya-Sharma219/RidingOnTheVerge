// components/HeroVideo.jsx
import React from "react";

const HeroVideo = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Centered Text */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Welcome to <br />
          <span className="text-red-600">RidingOnTheVerge</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroVideo;
