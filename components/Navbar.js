"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // State to track mute/unmute
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction for autoplay

  const audioRef = useRef(null);

  const songs = [
    "/music/music1.mp3",
    "/music/music2.mp3",
    "/music/music3.mp3",
    "/music/music4.mp3",
  ];

  // Pick a random song and start/seek
  const playRandomSong = () => {
    if (!audioRef.current) return;

    const randomIndex = Math.floor(Math.random() * songs.length);
    const startTime = Math.floor(Math.random() * 15); // 0 to 15 sec
    const duration = 30000 + Math.floor(Math.random() * 30000); // 30s to 60s

    const audio = audioRef.current;
    audio.src = songs[randomIndex];
    audio.currentTime = startTime;
    audio.volume = 0.3;
    audio.muted = isMuted;

    // Make sure the autoplay works and restart the song
    audio.play().catch((e) => console.warn("Autoplay blocked:", e));

    // Stop the current song after a random duration
    setTimeout(() => {
      audio.pause();
      playRandomSong(); // Trigger next song
    }, duration);
  };

  const handleSongEnd = () => {
    playRandomSong();
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        playRandomSong();
      }
    };

    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("scroll", handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
  }, [hasInteracted]);

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

  const toggleMute = () => {
    setIsMuted((prevState) => {
      if (audioRef.current) {
        audioRef.current.muted = !prevState;
      }
      return !prevState;
    });
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-white/90 backdrop-blur-md shadow-xl border-b border-red-400/20"
        : "bg-transparent text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
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

        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          {[{ name: "Home", href: "#home" }, { name: "About", href: "#about" }, { name: "Videos", href: "#videos" }, { name: "Gallery", href: "#gallery" }, { name: "Contact", href: "#footer" }, { name: "Game", href: "#game" }].map(
            (link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group transition duration-300 ${scrolled ? "text-gray-800" : "text-white"}`}
              >
                <span className="group-hover:text-red-500 transition-colors">{link.name}</span>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )
          )}
        </nav>

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

      {open && (
        <div className="md:hidden animate-fade-in-down bg-black/90 text-white px-6 pb-4 pt-2 space-y-3 shadow-xl transition-all transform translate-y-0">
          {[{ name: "Home", href: "#home" }, { name: "About", href: "#about" }, { name: "Videos", href: "#videos" }, { name: "Gallery", href: "#gallery" }, { name: "Contact", href: "#footer" }, { name: "Game", href: "#game" }].map(
            (link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-lg font-semibold hover:text-red-400 transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      )}

      {/* Mute Button (Mobile Fixed Position) */}
      <div
        className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${scrolled ? "block" : "hidden"}`}
      >
        <button
          onClick={toggleMute}
          className="text-xs sm:text-sm md:text-lg bg-white text-gray-800 border border-gray-400 px-3 py-1 rounded-lg shadow-lg hover:bg-red-100 transition-all cursor-pointer"
        >
          {isMuted ? "Unmute Music" : "Mute Music"}
        </button>
      </div>

      <audio ref={audioRef} preload="auto" onEnded={handleSongEnd} />
    </header>
  );
};

export default Navbar;
