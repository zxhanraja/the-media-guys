"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "Luxora Watches",
    category: "E-commerce, Premium Branding",
    year: "/24",
    image: "/images/p1.webp",
  },
  {
    num: "02",
    title: "Former & Co.",
    category: "Real Estate, Minimalist UI",
    year: "/24",
    image: "/images/p2.webp",
  },
  {
    num: "03",
    title: "Zenith Studio",
    category: "Architecture & Interior",
    year: "/24",
    image: "/images/p3.webp",
  },
  {
    num: "04",
    title: "Aura Beauty",
    category: "Skincare, Web Design",
    year: "/24",
    image: "/images/p4.webp",
  },
  {
    num: "05",
    title: "Nordic Gear",
    category: "Outdoor, E-commerce",
    year: "/24",
    image: "/images/p5.webp",
  },
];

import { useTranslation } from "@/lib/TranslationContext";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { t } = useTranslation();

  const projectsData = [
    { num: "01", title: t.projects.p1.title, category: t.projects.p1.category, image: "/images/p1.webp" },
    { num: "02", title: t.projects.p2.title, category: t.projects.p2.category, image: "/images/p2.webp" },
    { num: "03", title: t.projects.p3.title, category: t.projects.p3.category, image: "/images/p3.webp" },
    { num: "04", title: t.projects.p4.title, category: t.projects.p4.category, image: "/images/p4.webp" },
    { num: "05", title: t.projects.p5.title, category: t.projects.p5.category, image: "/images/p5.webp" },
    { num: "06", title: t.projects.p6.title, category: t.projects.p6.category, image: "/images/p6.webp" },
    { num: "07", title: t.projects.p7.title, category: t.projects.p7.category, image: "/images/p7.webp" },
    { num: "08", title: t.projects.p8.title, category: t.projects.p8.category, image: "/images/p8.webp" },
  ];

  const safeIdx = activeIdx % projectsData.length;
  const currentProject = projectsData[safeIdx] || projectsData[0];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % projectsData.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-header", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".project-info", {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".project-info",
          start: "top 85%",
        },
      });

      gsap.from(".project-image-box", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".project-image-box",
          start: "top 85%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-24 md:py-40 px-6 md:px-8 bg-background overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-24 border-b border-border pb-8 projects-header">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/40">
              {t.projects.label}
            </p>
            <span className="text-xl md:text-3xl font-black text-foreground uppercase tracking-tighter">
              Fail {currentProject.num}
            </span>
          </div>
          <p className="text-[10px] md:text-xs font-medium text-foreground/30 max-w-[150px] md:max-w-[200px] text-right">
            {t.projects.sublabel}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-20 items-center relative">
          
          {/* Left: Active Project Info */}
          <div className="md:col-span-1 lg:col-span-6 flex flex-col justify-center project-info z-20">
            <div className="flex gap-4 md:gap-8 items-start">
              <div className="flex flex-col gap-4 flex-1">
                <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-2">
                  Marketing BS Detected
                </div>
                <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black tracking-tighter text-foreground leading-[0.85] uppercase">
                  {currentProject.title}
                </h1>
                <p className="text-sm md:text-lg text-foreground/40 font-bold uppercase tracking-widest mt-4">
                  {currentProject.category}
                </p>
                
                <button 
                  onClick={handleNext}
                  className="mt-12 text-xs font-black uppercase tracking-[0.3em] border-b-2 border-accent pb-2 w-fit hover:text-foreground hover:border-foreground transition-colors"
                >
                  {t.projects.next} →
                </button>
              </div>
            </div>
          </div>

          {/* Right: Interactive Funny Quotes Card */}
          <div className="md:col-span-1 lg:col-span-6 flex justify-center lg:justify-end project-image-box mt-10 lg:mt-0">
            <div 
              className="relative w-full max-w-xl aspect-[16/10] cursor-pointer"
              onClick={handleNext}
            >
              {projectsData.map((p, i) => {
                const isFront = i === safeIdx;
                
                // Funny marketing quotes based on project index
                const quotes = [
                  "\"Budget: $10. Goal: 1 Million followers by Tuesday morning.\"",
                  "\"Can we make the logo bigger? Like, way bigger? (No pay increase)\"",
                  "\"We don't need SEO, we just need vibes and pure luck.\"",
                  "\"Let's just use AI for everything. Even the morning coffee.\"",
                  "\"Who is our target audience? Everyone. Everyone with a pulse.\"",
                  "\"We don't have a budget, but this project will give you GREAT exposure!\"",
                  "\"Can we use a font that looks expensive but also fun? Like gold Comic Sans?\"",
                  "\"Is it viral yet? I've been refreshing for exactly 2 minutes.\""
                ];

                return (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isFront ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 rotate-3 pointer-events-none'}`}
                    style={{
                      zIndex: isFront ? 10 : 0,
                    }}
                  >
                    <div className="relative w-full h-full rounded-[2rem] bg-accent flex items-center justify-center p-12 text-center border-2 border-foreground shadow-2xl overflow-hidden group">
                      {/* Decorative background elements */}
                      <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                      <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                      
                      <h2 className="text-white text-2xl md:text-4xl font-black italic leading-tight tracking-tight z-10">
                        {quotes[i]}
                      </h2>
                      
                      <div className="absolute bottom-8 right-10 text-white/40 text-[10px] font-bold uppercase tracking-widest z-10">
                        — Every Client Ever
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
