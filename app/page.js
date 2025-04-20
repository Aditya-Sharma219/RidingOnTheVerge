import CustomCursor from "@/components/CustomCursor";
import HeroCarousel from "@/components/HeroCarousel";
import HeroSection from "@/components/HeroSection";
import Trips from "@/components/Trips";
import About from "@/components/About";
import BikeScene from "@/components/BikeScene";
import ParallaxSection from "@/components/ParallaxSection";
import Video from "@/components/Video";
import Contact from "@/components/Contact";
import "./globals.css";


export default function Home() {
  return (
    <>
      <CustomCursor />
      <HeroCarousel />
      <HeroSection />
      <Video/>
      <Trips />
      <About />
      <BikeScene />
      <ParallaxSection />
      <Contact/>
      
    </>
  );
}
