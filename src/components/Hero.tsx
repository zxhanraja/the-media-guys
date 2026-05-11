"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/TranslationContext";

interface HeroProps {
  startAnimations?: boolean;
}

export default function Hero({ startAnimations = true }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!startAnimations || animated.current) return;
    animated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".char", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.02,
        delay: 0.6
      })
      .from(".hero-info", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1
      }, "-=0.8")
      .from(".hero-image", {
        scale: 1.1,
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1");
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimations]);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="relative min-h-screen pt-36 md:pt-52 pb-16 md:pb-20 px-6 md:px-8 bg-background flex flex-col justify-between overflow-x-hidden"
    >
      <div className="max-w-[1600px] mx-auto w-full relative h-full flex flex-col justify-between flex-1">
        
        {/* Top Headline & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start mb-8 md:mb-20">
          <div className="lg:col-span-9">
            <h1 ref={headlineRef} className="heading-giant text-[clamp(2.2rem,14vw,14rem)] md:text-[clamp(3.5rem,15vw,14rem)] leading-[0.85] tracking-tight text-foreground overflow-hidden">
              <div className="overflow-hidden">{splitText(t.hero.title1)}</div>
              <div className="overflow-hidden">{splitText(t.hero.title2)}</div>
            </h1>
          </div>
          
          <div className="lg:col-span-3 pt-2 md:pt-4 hero-info flex flex-col gap-8 md:gap-12">
            <p className="text-[13px] md:text-sm font-medium leading-relaxed max-w-[240px] text-foreground/60">
              {t.hero.description}
            </p>
            
            {/* Replaced list with 3 bold words */}
            <div className="hidden lg:flex flex-col gap-1 mt-4">
              <p className="text-4xl font-black uppercase tracking-tighter text-foreground/10 leading-none">{t.hero.craft}</p>
              <p className="text-4xl font-black uppercase tracking-tighter text-foreground/10 leading-none">{t.hero.code}</p>
              <p className="text-4xl font-black uppercase tracking-tighter text-foreground/10 leading-none">{t.hero.create}</p>
            </div>
          </div>
        </div>

        {/* Middle/Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mt-auto">
          {/* Tagline and Button */}
          <div className="lg:col-span-5 hero-info order-2 lg:order-1 mt-6 lg:mt-0">
            <p className="text-lg md:text-3xl font-normal leading-tight text-foreground/80 mb-6 md:mb-10 max-w-lg">
              {t.hero.tagline}
            </p>
            <Link href="#contact" className="inline-block bg-accent text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent/20">
              {t.hero.cta} →
            </Link>
          </div>
          
          {/* Socials */}
          <div className="hidden md:block lg:col-span-3 lg:offset-1 hero-info pb-1 lg:order-2">
            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-foreground/40">
              <span>{t.hero.followUs}</span>
              <div className="flex flex-col gap-2 text-foreground">
                <Link href="#" className="hover:opacity-60 transition-opacity">Instagram</Link>
                <Link href="#" className="hover:opacity-60 transition-opacity">LinkedIn</Link>
                <Link href="#" className="hover:opacity-60 transition-opacity">Twitter</Link>
              </div>
            </div>
          </div>

          {/* Floating Image */}
          <div className="lg:col-span-3 hero-image relative lg:-translate-y-16 mt-0 lg:mt-0 flex justify-center lg:block order-1 lg:order-3">
            <div className="relative w-[50%] md:w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
              <Image
                src="/images/hero-section.webp"
                alt="Crocosites Studio"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
