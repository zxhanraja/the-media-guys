"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/TranslationContext";
import { Plus } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const steps = [
    { num: "01.", title: t.howWeWork.step1.title, detail: t.howWeWork.step1.detail },
    { num: "02.", title: t.howWeWork.step2.title, detail: t.howWeWork.step2.detail },
    { num: "03.", title: t.howWeWork.step3.title, detail: t.howWeWork.step3.detail },
    { num: "04.", title: t.howWeWork.step4.title, detail: t.howWeWork.step4.detail },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-left", {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".work-right", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".vertical-text", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative py-24 md:py-40 px-6 md:px-8 bg-background overflow-hidden">
      
      {/* Vertical Swiss Text on Right */}
      <div className="vertical-text absolute right-[-12rem] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block opacity-10">
        <h2 className="text-[12rem] font-black text-accent uppercase tracking-tighter origin-center rotate-90 whitespace-nowrap">
          Orange Studio
        </h2>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          
          {/* Left: Title, Subtext & Image */}
          <div className="lg:col-span-5 work-left">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-8 md:mb-10 leading-[1.1]">
              {t.howWeWork.title}
            </h2>
            <p className="text-foreground/50 text-sm md:text-base max-w-sm leading-relaxed mb-10 md:mb-12">
              {t.howWeWork.subtitle}
            </p>
            
            <div className="relative w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about.webp"
                alt="Our Process"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Right: Steps List (Accordion) */}
          <div className="lg:col-span-6 lg:offset-1 lg:pt-20 work-right">
            <div className="flex flex-col border-t border-border">
              {steps.map((step, i) => (
                <div 
                  key={i} 
                  className="group flex flex-col border-b border-border cursor-pointer overflow-hidden transition-colors hover:bg-foreground/[0.02]"
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                >
                  <div className="flex items-center justify-between py-6 md:py-8">
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="text-[10px] md:text-xs font-bold text-foreground/40">{step.num}</span>
                      <h3 className="text-lg md:text-2xl font-medium text-foreground uppercase tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                    <Plus className={`w-4 h-4 md:w-5 md:h-5 text-foreground/40 transition-transform duration-500 ${activeIndex === i ? 'rotate-45 text-foreground' : ''}`} />
                  </div>

                  {/* Accordion Detail Content */}
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${activeIndex === i ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-foreground/60 text-sm md:text-lg leading-relaxed pl-14 md:pl-16 max-w-lg">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
