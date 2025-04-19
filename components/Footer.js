"use client";
import React from "react";
import {
  Youtube,
  Mail,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="bg-gradient-to-r from-gray-200 to-gray-100 py-10 border-t border-gray-300"
    >
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

      {/* Collaborate Section */}
      <div className="text-center mt-10 px-4 max-w-2xl mx-auto bg-white/60 rounded-xl shadow-md py-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Work With Us 🚀</h3>
        <p className="text-md text-gray-700">
          Interested in sponsoring our rides or collaborating with us?
          We&apos;d love to hear from you! Reach out via{" "}
          <a
            href="mailto:ridingontheverge@gmail.com"
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            email
          </a>{" "}
          or connect on our{" "}
          <a
            href="https://instagram.com/ridingontheverge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 underline hover:text-pink-800 transition"
          >
            socials
          </a>.
        </p>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-6 space-y-1">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Riding On The Verge. All rights reserved.
        </p>
        <p className="text-sm text-gray-600">
          Website Created by{" "}
          <a
            href="https://www.linkedin.com/in/aditya-sharma-49a9142a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900 transition"
          >
            Aditya Sharma
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
