"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (dividerRef.current) {
        const rect = dividerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate parallax offset based on position in viewport
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const offset = (elementCenter - viewportCenter) * 0.15;
        
        dividerRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: "clamp(120px, 15vw, 200px)" }}
    >
      <div
        ref={dividerRef}
        className="absolute inset-x-0 -top-1/2 -bottom-1/2"
        style={{ willChange: "transform" }}
      >
        {/* Full width image, cropped to show just the tips */}
        <div className="relative w-full h-full">
          <Image
            src="/images/fence.png"
            alt=""
            fill
            className="object-cover object-top"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
