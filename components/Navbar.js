"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Videos", href: "#videos" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#footer" },
    { name: "Game", href: "#game" },
  ];

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-white/90 backdrop-blur-md shadow-xl border-b border-red-400/20"
        : "bg-transparent text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-4">
          <Link href="#home">
            <Image
              className="rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"
              src="/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
            />
          </Link>

          <a
            href="https://youtube.com/@RidingOnTheVerge"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 
              bg-clip-text text-transparent transition-all duration-300 ease-in-out drop-shadow-lg hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]`}
          >
            RidingOnTheVerge
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative group transition duration-300 ${scrolled ? "text-gray-800" : "text-white"}`}
            >
              <span className="group-hover:text-red-500 transition-colors">
                {link.name}
              </span>
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            className="text-gray-800 hover:text-red-500 transition-transform hover:scale-110"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-in */}
      {open && (
        <div className="md:hidden animate-fade-in-down bg-black/90 text-white px-6 pb-4 pt-2 space-y-3 shadow-xl transition-all transform translate-y-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-lg font-semibold hover:text-red-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
