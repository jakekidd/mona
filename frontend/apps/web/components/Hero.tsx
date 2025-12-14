"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollY = window.scrollY;
        // Subtle parallax - background moves at 30% of scroll speed
        backgroundRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10"
        style={{ willChange: "transform" }}
      >
        {/* Gradient background - will be replaced with hero image */}
        <div className="absolute inset-0 bg-gradient-to-br from-blush/40 via-white to-rose/30" />
        
        {/* Placeholder for hero image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-white/50 to-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 
          className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          Your Perfect Shade Awaits
        </h1>
        <p 
          className="font-body text-lg md:text-xl text-charcoal-muted max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
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
            className="group px-8 py-4 bg-charcoal text-white font-body text-sm tracking-wide rounded-sm overflow-hidden relative"
          >
            <span className="relative z-10">Shop Bestsellers</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-deep to-berry opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#finder"
            className="px-8 py-4 border border-charcoal text-charcoal font-body text-sm tracking-wide rounded-sm hover:bg-charcoal hover:text-white transition-all duration-300"
          >
            Find Your Shade
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
        <div className="flex flex-col items-center gap-2 text-charcoal-muted">
          <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
          <svg 
            className="w-5 h-5 animate-bounce" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

