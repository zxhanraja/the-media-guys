"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

interface LoaderProps {
  onComplete: () => void;
}

// Particle spread config: [x offset, y offset] in px
const PARTICLES = [
  { x: -50, y: -30 },
  { x: 40, y: -40 },
  { x: 60, y: 15 },
  { x: -40, y: 20 },
  { x: 25, y: -35 },
  { x: 0, y: -60 },
];

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  const text = "Crocosites.";

  useEffect(() => {
    const loader = loaderRef.current;
    const dot = dotRef.current;
    const textEl = textRef.current;
    if (!loader || !dot || !textEl) return;

    const ctx = gsap.context(() => {
      const title = textEl.querySelector(".loader-title");
      const particles = particleRefs.current.filter(Boolean) as HTMLDivElement[];

      // Initial states
      gsap.set(dot, { 
        xPercent: -50, 
        y: -100, // Start above the screen
        scaleX: 1, 
        scaleY: 1, 
        opacity: 1 
      });
      gsap.set(title, { y: 20, opacity: 0 });
      gsap.set(textEl, { opacity: 0 });
      gsap.set(particles, { x: 0, y: 0, opacity: 0, scale: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("croco_loaded", "1");
          setVisible(false);
          onComplete();
        },
      });

      // 1 — Dot falls with gravity to EXACT center
      tl.to(dot, {
        y: "50vh",
        duration: 0.5,
        ease: "power2.in",
      })

      // 2 — Splat: squish dot flat
      .to(dot, {
        scaleX: 4,
        scaleY: 0.1,
        duration: 0.1,
        ease: "power4.out",
      })

      // 2b — Particles burst
      .set(particles, (i: number) => ({
        x: PARTICLES[i]?.x ?? 0,
        y: PARTICLES[i]?.y ?? 0,
        opacity: 1,
        scale: Math.random() * 0.5 + 0.5,
      }), "<")

      // 2c — Particles drift and fade
      .to(particles, (i: number) => ({
        x: (PARTICLES[i]?.x ?? 0) * 2,
        y: (PARTICLES[i]?.y ?? 0) * 1.5 + 20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      }), "<")

      // 3 — Dot snaps back and expands to fill or fades
      .to(dot, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.15,
        ease: "elastic.out(1, 0.3)",
      })
      .to(dot, { 
        opacity: 0, 
        scale: 0.5,
        duration: 0.15,
        ease: "power2.in"
      })

      // 4 — Text reveals in center
      .set(textEl, { opacity: 1 }, "-=0.1")
      .to(title, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
      }, "<")

      // 5 — Hold briefly
      .to({}, { duration: 0.3 })

      // 6 — Premium reveal
      .to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut",
      });
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  const skip = () => {
    gsap.killTweensOf([loaderRef.current, dotRef.current]);
    sessionStorage.setItem("croco_loaded", "1");
    gsap.to(loaderRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: "expo.inOut",
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });
  };

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      id="loader"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F2741F",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Skip button */}
      <button
        onClick={skip}
        aria-label="Skip intro"
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#FFFFFF",
          opacity: 0.6,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: 10000,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
        }}
      >
        Skip →
      </button>

      {/* Animation Container - Centered */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: 0,
          height: "100%",
        }}
      >
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 24,
            height: 24,
            marginLeft: -12,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            transformOrigin: "center bottom",
          }}
        />

        {PARTICLES.map((_, i) => (
          <div
            key={i}
            ref={(el) => { particleRefs.current[i] = el; }}
            style={{
              position: "absolute",
              top: "50vh",
              left: "50%",
              width: i % 2 === 0 ? 8 : 6,
              height: i % 2 === 0 ? 8 : 6,
              marginLeft: -4,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              transformOrigin: "center center",
              opacity: 0,
            }}
          />
        ))}

        <div
          ref={textRef}
          style={{
            position: "absolute",
            top: "50vh",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            whiteSpace: "nowrap",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <span
            className="loader-title"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              color: "#FFFFFF",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              Orange Studio
            </span>
            <span
              style={{
                fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
                fontWeight: 500,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              Marketing
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
