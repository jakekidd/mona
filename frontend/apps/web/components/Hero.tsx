"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollY = window.scrollY;
        backgroundRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full screen background image */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/images/banner.png"
          alt="Mona Empire lip gloss collection"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content - positioned at top of image, below navbar */}
      <div
        className="relative z-10 w-full"
        style={{
          marginTop: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "960px",
            paddingInline: "clamp(24px, 5vw, 72px)",
            textAlign: "center",
          }}
        >
        <h1 
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          Your Perfect Shade Awaits
        </h1>
        <p
          className="font-body text-base sm:text-lg md:text-xl text-charcoal-muted mb-10 opacity-0 animate-fade-in"
          style={{
            animationDelay: "0.4s",
            animationFillMode: "forwards",
            maxWidth: "720px",
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          Luxurious lip glosses crafted with intention. Hydrating formulas, 
          stunning finishes, and colors that feel like you.
        </p>
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          <a
            href="#bestsellers"
            style={{ padding: "1.25rem 3rem" }}
            className="btn-gradient text-white font-body text-base tracking-wide rounded"
          >
            Shop Bestsellers
          </a>
          <a
            href="#shop"
            style={{ padding: "1.25rem 3rem" }}
            className="bg-white border-2 border-charcoal text-charcoal font-body text-base tracking-wide rounded hover:bg-charcoal hover:text-white transition-all duration-300"
          >
            Find Your Shade
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
