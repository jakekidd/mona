"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Product, Shade } from "@/lib/types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, shade: Shade) => void;
}

const finishLabels: Record<string, string> = {
  sheer: "Sheer",
  glossy: "Glossy",
  plumping: "Plumping",
  sparkle: "Sparkle",
};

const finishDescriptions: Record<string, string> = {
  sheer: "Light, buildable coverage with a natural finish",
  glossy: "High-shine, glass-like finish",
  plumping: "Volumizing formula for fuller-looking lips",
  sparkle: "Luminous shimmer with light-reflecting particles",
};

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedShade(product.shades[0] ?? null);
      setQuantity(1);
    }
  }, [product]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!product || !selectedShade) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, selectedShade);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-4 md:inset-8 lg:inset-16 bg-white z-50 rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-charcoal-muted hover:text-charcoal transition-colors bg-white/80 rounded-full"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Section */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-blush/20">
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${selectedShade.hex}40 0%, ${selectedShade.hex}20 100%)`,
            }}
          />
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
          <div className="max-w-lg">
            {/* Finish Tag */}
            <span className="font-body text-xs text-charcoal-muted uppercase tracking-wider">
              {finishLabels[product.finish]}
            </span>

            {/* Name */}
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mt-2 mb-4">
              {product.name}
            </h2>

            {/* Price */}
            <p className="font-display text-2xl text-charcoal mb-6">
              ${product.price}
            </p>

            {/* Description */}
            <p className="font-body text-charcoal-muted leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Shade Selection */}
            <div className="mb-8">
              <p className="font-body text-sm text-charcoal mb-3">
                Shade: <span className="text-charcoal-muted">{selectedShade.name}</span>
              </p>
              <div className="flex gap-3">
                {product.shades.map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShade(shade)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedShade.id === shade.id
                        ? "border-charcoal scale-110 shadow-md"
                        : "border-transparent hover:scale-110"
                    }`}
                    style={{ backgroundColor: shade.hex }}
                    title={shade.name}
                    aria-label={`Select ${shade.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-body text-sm text-charcoal mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-charcoal/20 rounded-sm flex items-center justify-center text-charcoal hover:border-charcoal transition-colors"
                  aria-label="Decrease quantity"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                  </svg>
                </button>
                <span className="font-body text-lg text-charcoal w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-charcoal/20 rounded-sm flex items-center justify-center text-charcoal hover:border-charcoal transition-colors"
                  aria-label="Increase quantity"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-charcoal text-white font-body text-sm tracking-wide rounded-sm hover:bg-charcoal-light transition-colors mb-8"
            >
              Add to Bag - ${(product.price * quantity).toFixed(2)}
            </button>

            {/* Finish Description */}
            <div className="border-t border-charcoal/10 pt-6 mb-6">
              <h3 className="font-display text-lg text-charcoal mb-2">Finish</h3>
              <p className="font-body text-sm text-charcoal-muted">
                {finishDescriptions[product.finish]}
              </p>
            </div>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="border-t border-charcoal/10 pt-6 mb-6">
                <h3 className="font-display text-lg text-charcoal mb-2">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="px-3 py-1 bg-blush/30 text-charcoal-muted font-body text-xs rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Scent */}
            {product.scent && (
              <div className="border-t border-charcoal/10 pt-6">
                <h3 className="font-display text-lg text-charcoal mb-2">Scent</h3>
                <p className="font-body text-sm text-charcoal-muted">{product.scent}</p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {product.tags.includes("vegan") && (
                <span className="px-3 py-1 border border-charcoal/20 text-charcoal-muted font-body text-xs rounded-sm">
                  Vegan
                </span>
              )}
              {product.tags.includes("cruelty-free") && (
                <span className="px-3 py-1 border border-charcoal/20 text-charcoal-muted font-body text-xs rounded-sm">
                  Cruelty-Free
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

