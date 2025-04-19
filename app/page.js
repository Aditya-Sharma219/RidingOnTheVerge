import HeroCarousel from "@/components/HeroCarousel";
import HeroSection from "@/components/HeroSection";
import Trips from "@/components/Trips";
import ParallaxSection from "@/components/ParallaxSection";
import "./globals.css";
import Footer from "@/components/Footer";
import About from "@/components/About";



export default function Home() {
  return (<>

  <HeroCarousel />
  <HeroSection  />
  <Trips />
  <About />

<ParallaxSection/>


      <Footer />
  </>
  );
}
