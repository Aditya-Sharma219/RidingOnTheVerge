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
    <footer className="bg-gray-100 py-10 border-t border-gray-300">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Links */}
        <div className="flex gap-6 text-gray-700 font-medium text-lg">
          <button onClick={() => scrollToSection("hc")}>Home</button>
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("gallery")}>Gallery</button>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-gray-700">
          <a
            href="https://youtube.com/@RidingOnTheVerge" // replace with your actual link
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <Youtube className="w-6 h-6 hover:text-red-600 transition" />
          </a>
          <a
            href="mailto:ridingontheverge@gmail.com" // replace with your actual email
            aria-label="Email"
          >
            <Mail className="w-6 h-6 hover:text-blue-600 transition" />
          </a>
          <a
            href="https://instagram.com/ridingontheverge" // replace with your actual Insta
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6 hover:text-pink-500 transition" />
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
