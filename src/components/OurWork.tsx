"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const reels = [
  { id: 1, src: "/reels/reel1.mp4", title: "Social Campaign", client: "Brand A" },
  { id: 2, src: "/reels/reel2.mp4", title: "Creative Story", client: "Brand B" },
  { id: 3, src: "/reels/reel3.mp4", title: "Brand Identity", client: "Brand C" },
];

function ReelCard({ reel, isActive, onVideoEnd }: { reel: typeof reels[0], isActive: boolean, onVideoEnd?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Keep all videos playing in background, unmuting only the active one
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isActive || isMuted;
      videoRef.current.play().catch(() => {});
    }
  }, [isActive, isMuted]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <div 
      className={cn(
        "relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0",
        "w-[70vw] md:w-[25vw] lg:w-[18vw] max-w-[380px]",
        isActive ? "z-20 scale-110 opacity-100" : "z-10 scale-90 opacity-45 blur-[1px]"
      )}
    >
      <div 
        className="relative aspect-[9/16] w-full bg-muted rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-transparent transition-all duration-500"
      >
        <video
          ref={videoRef}
          src={reel.src}
          className="w-full h-full object-cover"
          onEnded={onVideoEnd}
          muted={!isActive || isMuted}
          playsInline
          preload="auto"
          loop={!isActive}
          autoPlay
        />
        
        {/* Controls Overlay (Only on Active) */}
        {isActive && (
          <>
            <div className="absolute top-6 right-6 z-30">
              <button 
                onClick={toggleSound}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent transition-colors"
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                )}
              </button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-10 pointer-events-none">
              <span className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2">
                {reel.client}
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter">
                {reel.title}
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function OurWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % reels.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  const getTranslateX = () => {
    if (typeof window === "undefined") return "0px";
    
    const vw = window.innerWidth;
    const isMobile = vw < 768;
    
    // DISABLE SLIDING ON LAPTOP: Keep track stationary if not mobile
    if (!isMobile) return "0px";
    
    const cardWidth = vw * 0.7; // 70vw on mobile
    const gap = 8;
    
    // On mobile, we still want to center the active reel
    const offset = (1 - activeIndex) * (cardWidth + gap);
    return `${offset}px`;
  };

  return (
    <section id="our-work" ref={containerRef} className="py-24 md:py-40 bg-background overflow-hidden border-t border-border">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center">
        
        {/* Styled Header */}
        <div className="text-center mb-16 md:mb-24 px-6">
          <h2 className="text-[clamp(3.5rem,10vw,8rem)] font-black tracking-tighter uppercase leading-none flex flex-col md:flex-row items-center justify-center gap-x-6">
            <span className="text-foreground">OUR</span>
            <span className="text-accent italic font-light outline-text">WORK</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full flex items-center justify-center">
          {/* Nav Arrows - Hidden on Laptop (Universal) */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 md:left-20 z-40 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-foreground hover:bg-accent hover:text-white transition-all shadow-2xl lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          {/* Sliding Track with Edge Fading (Mobile Only) */}
          <div className={cn(
            "w-full flex justify-center overflow-visible py-10",
            "md:[mask-image:none] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
          )}>
            <div 
              className="flex items-center gap-2 md:gap-8 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `translateX(${getTranslateX()})` }}
            >
              {reels.map((reel, index) => (
                <ReelCard 
                  key={reel.id} 
                  reel={reel} 
                  isActive={index === activeIndex}
                  onVideoEnd={index === activeIndex ? nextSlide : undefined}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide}
            className="absolute right-4 md:right-20 z-40 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-foreground hover:bg-accent hover:text-white transition-all shadow-2xl lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="mt-12 flex gap-3">
          {reels.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-1.5 transition-all duration-500 rounded-full",
                i === activeIndex ? "w-10 bg-accent" : "w-2 bg-foreground/20"
              )}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20">
          <button className="pill-button px-10 py-5">
            View All Work →
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px var(--accent);
          color: transparent;
        }
      `}</style>
    </section>
  );
}
