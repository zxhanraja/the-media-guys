"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/TranslationContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: t.nav.about, id: "about" },
    { name: t.nav.services, id: "services" },
    { name: t.nav.work, id: "our-work" },
    { name: t.nav.projects, id: "projects" },
    { name: t.nav.contact, id: "contact" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
          scrolled
            ? "py-4 bg-background/90 backdrop-blur-xl"
            : "py-8 md:py-12 bg-transparent"
        )}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-[20px] md:text-[24px] font-black tracking-tighter text-foreground uppercase flex items-center gap-1"
          >
            <span>The Media</span>
            <span className="text-accent">Guys</span>
          </Link>

          {/* Universal Nav (Hamburger for all screens) */}
          <div className="flex items-center gap-6">
            {/* Desktop Language Switcher (Optional - can keep or move to menu) */}
            <div className="hidden lg:flex items-center gap-4 border-r border-foreground/10 pr-6 mr-2">
              <button 
                onClick={() => setLanguage("hi")}
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  language === "hi" ? "text-foreground" : "text-foreground/30 hover:text-foreground/60"
                )}
              >
                Hindi
              </button>
              <button 
                onClick={() => setLanguage("en")}
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  language === "en" ? "text-foreground" : "text-foreground/30 hover:text-foreground/60"
                )}
              >
                EN
              </button>
            </div>

            {/* Hamburger Button (Universal) */}
            <button
              className="relative w-12 h-12 flex flex-col justify-center items-center gap-1.5 group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={cn("w-7 h-[2px] bg-foreground block transition-all duration-500 origin-center", menuOpen && "rotate-45 translate-y-[4px]")} />
              <span className={cn("w-7 h-[2px] bg-foreground block transition-all duration-500", menuOpen && "opacity-0")} />
              <span className={cn("w-7 h-[2px] bg-foreground block transition-all duration-500 origin-center", menuOpen && "-rotate-45 -translate-y-[4px]")} />
              
              {/* Optional label for desktop */}
              <span className="absolute -left-12 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>


        </div>
      </nav>

      <div className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col justify-center items-center gap-6",
        menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        {links.map((link) => (
          <Link
            key={link.id}
            href={`#${link.id}`}
            onClick={() => setMenuOpen(false)}
            className="text-4xl font-black text-foreground uppercase tracking-tighter hover:text-accent transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <Link 
          href="#contact" 
          onClick={() => setMenuOpen(false)}
          className="mt-8 px-10 py-4 bg-foreground text-background rounded-full text-sm font-black uppercase tracking-widest"
        >
          {t.nav.letsTalk} →
        </Link>
      </div>
    </>
  );
}
