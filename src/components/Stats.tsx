"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: "+", label: "Campaigns Managed" },
  { value: 92, suffix: "%", label: "Average ROI Increase" },
  { value: 50, suffix: "+", label: "Partner Brands" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: value,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: function () {
              setCount(Math.floor((this.targets()[0] as { val: number }).val));
            },
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-ticker", {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".stat-item-box", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stat-item-box",
          start: "top 85%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 px-8 bg-background border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Marquee ticker */}
        <div className="overflow-hidden mb-32 border-b border-border pb-12 stat-ticker">
          <div className="flex">
            <div className="marquee-track">
              {["Growth Strategy", "Visual Identity", "Digital Campaigns", "ROI Driven", "Brand Scaling", "Creative Content", "Market Analysis",
                "Growth Strategy", "Visual Identity", "Digital Campaigns", "ROI Driven", "Brand Scaling", "Creative Content", "Market Analysis"].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-4 text-foreground/10 font-bold uppercase tracking-widest text-sm">
                  {item} <span className="text-foreground/20 text-lg">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item-box flex flex-col gap-6">
              <div
                className="text-[clamp(5rem,12vw,12rem)] font-black leading-none tracking-tighter text-foreground"
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/40 max-w-[120px] leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
