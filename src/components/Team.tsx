"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Kanak",
    role: "Founder / Lead Designer",
    funRole: "Professional Coffee Drinker",
    image: "/images/founder.webp",
    status: "Designing...",
    funStatus: "Thinking about 🍕",
    tools: ["Figma", "Next.js", "GSAP"]
  },
];

import { useTranslation } from "@/lib/TranslationContext";

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const { t } = useTranslation();

  const teamData = [
    {
      name: "Kanak",
      role: t.team.m1.role,
      funRole: t.team.m1.funRole,
      image: "/images/founder.webp",
      status: t.team.m1.status,
      funStatus: t.team.m1.funStatus,
      tools: ["Meta Ads", "Google Ads", "Content Strategy"]
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-left", {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".team-right", {
        x: 100,
        opacity: 0,
        duration: 1.2,
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
    <section ref={containerRef} className="py-24 md:py-40 px-6 md:px-8 bg-background border-t border-border overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16">
          
          <div className="w-full lg:w-1/3 team-left">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/40 mb-6 md:mb-8">{t.team.label}</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 md:mb-8 leading-[1.1]">
              {t.team.title}
            </h2>
            <p className="text-foreground/50 text-base md:text-lg leading-relaxed">
              {t.team.subtitle}
            </p>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center team-right">
            {teamData.map((member, i) => (
              <div 
                key={i} 
                className="group flex flex-col gap-6 max-w-sm w-full cursor-none-cursor"
                onMouseEnter={() => setHoveredMember(i)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted transition-all duration-500 shadow-2xl border border-border group-hover:border-foreground/20">
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <div className="bg-foreground/90 backdrop-blur-md text-background px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] flex items-center shadow-2xl">
                      {hoveredMember === i ? member.funStatus : member.status}
                    </div>
                  </div>

                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Floating Tools on Hover */}
                  <div className={`absolute bottom-6 left-6 flex flex-wrap gap-2 transition-all duration-500 ${hoveredMember === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {member.tools.map((tool, idx) => (
                      <span key={idx} className="bg-white/90 backdrop-blur-md text-foreground px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-center md:text-left px-2">
                  <h3 className="text-2xl md:text-4xl font-black text-foreground tracking-tighter uppercase leading-none">
                    {member.name}
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/40 font-bold uppercase tracking-[0.2em] transition-colors group-hover:text-foreground">
                    {hoveredMember === i ? (
                      member.funRole
                    ) : (
                      <>
                        {member.role.split(" / ")[0]} / <span className="text-accent">{member.role.split(" / ")[1]}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
