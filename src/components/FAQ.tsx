"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/TranslationContext";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-40 px-6 md:px-8 bg-background border-t-2 border-foreground">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-6xl md:text-9xl font-black text-foreground mb-16 md:mb-32 uppercase tracking-tighter faq-item leading-none">
          {t.faq.title}
        </h2>
        
        <div className="flex flex-col border-t-2 border-foreground">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="faq-item group flex flex-col border-b-2 border-foreground cursor-pointer transition-colors hover:bg-foreground/[0.02]"
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between py-8 md:py-12">
                <h3 className="text-2xl md:text-5xl font-bold text-foreground tracking-tighter uppercase w-10/12 md:w-11/12 leading-tight">
                  {faq.q}
                </h3>
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0">
                  <Plus strokeWidth={3} className={`w-8 h-8 md:w-12 md:h-12 text-foreground transition-transform duration-500 ${activeIndex === i ? 'rotate-45' : ''}`} />
                </div>
              </div>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${activeIndex === i ? 'max-h-96 pb-12 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-foreground/80 text-lg md:text-2xl font-medium leading-relaxed max-w-5xl pr-8">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
