"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import HowWeWork from "@/components/HowWeWork";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import OurWork from "@/components/OurWork";

// Dynamically import Loader to avoid SSR issues with GSAP
const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <CustomCursor />
      <Loader onComplete={handleLoaderComplete} />

      {/* Main content — always mounted so GSAP targets exist */}
      <div
        style={{
          opacity: heroReady ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      >
        <Navbar />
        <section id="home">
          <Hero startAnimations={heroReady} />
        </section>
        
        <HowWeWork />
        <LogoMarquee />
        
        <Services />
        <Projects />
        <OurWork />
        <Team />
        <Footer />
      </div>
    </main>
  );
}
