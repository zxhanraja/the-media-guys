"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  const servicesList = [
    "Reel Shoots & Editing",
    "Promotional Videos",
    "Social Media Content Creation",
    "Instagram Page Handling",
    "Scriptwriting for Reels & Ads",
    "Poster & Creative Designing",
    "Event Coverage",
    "AI-Based Visual & Video Content"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Base animations for all items
      gsap.utils.toArray<HTMLElement>(".svc-item").forEach((item, i) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="py-32 md:py-40 px-6 md:px-8 bg-background border-t border-border overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-16 svc-item tracking-tighter uppercase">
          We currently provide:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 mb-20">
          {servicesList.map((svc, i) => (
            <div 
              key={i} 
              className="svc-item flex items-center gap-6 border-b border-foreground/20 pb-6 group"
            >
              <span className="text-foreground/40 font-black text-2xl group-hover:text-foreground transition-colors duration-300">
                {(i + 1).toString().padStart(2, '0')}.
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-foreground tracking-tighter">
                {svc}
              </h3>
            </div>
          ))}
        </div>

        <div className="svc-item border-l-4 border-accent pl-8 py-2">
          <p className="text-2xl md:text-4xl font-medium text-foreground/80 leading-relaxed max-w-5xl">
            We mainly work with local businesses, education sectors, and brands for content and promotion.
          </p>
        </div>
      </div>
    </section>
  );
}
