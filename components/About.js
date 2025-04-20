"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="bg-white py-16 px-4 md:px-8 lg:px-20 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Riding On The Verge
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to <span className="font-semibold">Riding On The Verge</span> – where
            the journey is as epic as the destination!
            <br />
            <br />
            From the scorching dunes of Rajasthan&apos;s deserts to the snow-kissed peaks of
            the Himalayas, from lush green valleys to wild national parks and mighty rivers &ndash;
            we ride through every heartbeat of India.
            <br />
            <br />
            Our adventures are more than just rides &mdash; they are raw, real, and unfiltered experiences
            on the back of our roaring Harley-Davidson bikes. Every trail has a story, every mountain
            hides a memory, and every river sings a new song.
            <br />
            <br />
            Whether it&apos;s the spiritual serenity of the hills, the roaring rush of the highways, or
            the untouched beauty of nature, we capture it all &mdash; the thrill, the challenges, and the
            breathtaking views &mdash; so you can experience the freedom of the road with us.
            <br />
            <br />
            Subscribe, buckle up, and let&apos;s ride through the soul of India together &mdash; one destination,
            one emotion, one throttle at a time.
          </p>
        </div>

        {/* Image Carousel */}
        <div className="relative w-full flex justify-center">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 2500 }}
            className="rounded-xl shadow-lg w-full max-w-lg h-80" // Added explicit height for visibility
          >
            {[ 
              "/images/bike6.jpg",
              "/images/bike2.jpg",
              "/images/bike5.jpg",
              "/images/bike3.jpg",
            ].map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`Ride image ${i + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white text-2xl font-semibold bg-black/50 p-2 rounded-lg">
                    Adventure Awaits
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default About;
