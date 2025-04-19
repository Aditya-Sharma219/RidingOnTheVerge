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
  <ParallaxSection
        imageUrl="/images/photo1.jpg"
        heading="EXPLORATION WITH AN EDGE"
        subheading="Get to know about the Culture & Lifestyle of the Himalayas."
      />

      <ParallaxSection
        imageUrl="/images/photo2.jpg"
        heading="TEST YOUR METTLE"
        subheading="Conquer the toughest roads with us!"
      />

      <ParallaxSection
        imageUrl="/images/photo3.jpg"
        heading="LIVE ON THE VERGE"
      />

      <Footer />
  </>
  );
}
