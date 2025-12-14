"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product, Shade } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product, shade: Shade) => void;
  onViewDetails?: (product: Product) => void;
}

const finishLabels: Record<string, string> = {
  sheer: "Sheer",
  glossy: "Glossy",
  plumping: "Plumping",
  sparkle: "Sparkle",
};

export default function ProductCard({ product, onQuickAdd, onViewDetails }: ProductCardProps) {
  const [selectedShade, setSelectedShade] = useState<Shade>(product.shades[0]!);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[3/4] bg-blush/20 rounded-sm overflow-hidden cursor-pointer mb-4"
        onClick={() => onViewDetails?.(product)}
      >
        {/* Placeholder gradient - will be replaced with actual image */}
        <div 
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${selectedShade.hex}40 0%, ${selectedShade.hex}20 100%)`,
          }}
        />
        
        {/* Product image would go here */}
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.tags.includes("bestseller") && (
            <span className="px-2 py-1 bg-charcoal text-white text-xs font-body tracking-wide rounded-sm">
              Bestseller
            </span>
          )}
          {product.tags.includes("new") && (
            <span className="px-2 py-1 bg-rose-deep text-white text-xs font-body tracking-wide rounded-sm">
              New
            </span>
          )}
        </div>

        {/* Quick Add Overlay */}
        <div 
          className={`absolute inset-0 bg-charcoal/0 flex items-end justify-center pb-4 transition-all duration-300 ${
            isHovered ? "bg-charcoal/20" : ""
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd?.(product, selectedShade);
            }}
            className={`px-6 py-3 bg-white text-charcoal font-body text-sm tracking-wide rounded-sm shadow-lg transform transition-all duration-300 hover:bg-charcoal hover:text-white ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Finish Tag */}
        <span className="font-body text-xs text-charcoal-muted uppercase tracking-wider">
          {finishLabels[product.finish]}
        </span>

        {/* Name & Price */}
        <div className="flex justify-between items-start">
          <h3 
            className="font-display text-lg text-charcoal cursor-pointer hover:text-charcoal-light transition-colors"
            onClick={() => onViewDetails?.(product)}
          >
            {product.name}
          </h3>
          <span className="font-body text-sm text-charcoal">
            ${product.price}
          </span>
        </div>

        {/* Shade Swatches */}
        <div className="flex gap-2 pt-1">
          {product.shades.map((shade) => (
            <button
              key={shade.id}
              onClick={() => setSelectedShade(shade)}
              className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                selectedShade.id === shade.id 
                  ? "border-charcoal scale-110" 
                  : "border-transparent hover:scale-110"
              }`}
              style={{ backgroundColor: shade.hex }}
              title={shade.name}
              aria-label={`Select ${shade.name}`}
            />
          ))}
        </div>

        {/* Selected Shade Name */}
        <p className="font-body text-xs text-charcoal-muted">
          {selectedShade.name}
        </p>
      </div>
    </div>
  );
}

