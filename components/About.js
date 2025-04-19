"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const About = () => {
  return (
    <section
      id="about"
      className="bg-white py-16 px-4 md:px-8 lg:px-20 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Riding On The Verge
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold">Riding On The Verge</span> – where
            passion meets the open road!
            <br />
            <br />
            This channel is all about exploring rugged terrains, discovering
            the rich culture of the Himalayas, and living life on the edge –
            one ride at a time. Whether it’s tackling extreme weather, sharing
            real travel experiences, or just showing the raw beauty of mountain
            life, we bring it all to you with honesty and adventure.
            <br />
            <br />
            Hop on, subscribe, and let’s ride together into the unknown!
          </p>
        </div>

        {/* Image Carousel */}
        <div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 2500 }}
            className="rounded-xl shadow-lg max-w-sm"
          >
            {[
              "/images/bike1.jpg",
              "/images/bike2.jpg",
              "/images/bike3.jpg",
              "/images/bike4.jpg",
            ].map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`Ride image ${i + 1}`}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default About;
