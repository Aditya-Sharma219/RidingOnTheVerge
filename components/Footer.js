"use client";
import React from "react";
import {
  Youtube,
  Mail,
  Instagram,
  Home,
  GalleryHorizontalEnd,
  Info,
  Phone,
} from "lucide-react";

const Footer = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-200 to-gray-100 py-10 border-t border-gray-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Links Section */}
        <div className="flex gap-8 text-gray-700 font-medium text-lg">
          <button
            onClick={() => scrollToSection("hc")}
            aria-label="Go to Home Section"
            className="hover:text-blue-600 cursor-pointer transition-colors duration-300"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            aria-label="Go to About Section"
            className="hover:text-blue-600 cursor-pointer transition-colors duration-300"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            aria-label="Go to Gallery Section"
            className="hover:text-blue-600 cursor-pointer transition-colors duration-300"
          >
            Gallery
          </button>
        </div>

        {/* Social Icons Section */}
        <div className="flex gap-8 text-gray-700">
          <a
            href="https://youtube.com/@RidingOnTheVerge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to YouTube"
            className="hover:text-red-600 transition-transform transform hover:scale-110 duration-300"
          >
            <Youtube className="w-8 h-8" />
          </a>
          <a
            href="mailto:ridingontheverge@gmail.com"
            aria-label="Send Email"
            className="hover:text-blue-600 transition-transform transform hover:scale-110 duration-300"
          >
            <Mail className="w-8 h-8" />
          </a>
          <a
            href="https://instagram.com/ridingontheverge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Instagram"
            className="hover:text-pink-500 transition-transform transform hover:scale-110 duration-300"
          >
            <Instagram className="w-8 h-8" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} Riding On The Verge. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
