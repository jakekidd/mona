"use client";

import ProductCard from "./ProductCard";
import ScrollReveal from "./ScrollReveal";
import type { Product, Shade } from "@/lib/types";

interface BestsellersProps {
  products: Product[];
  onQuickAdd?: (product: Product, shade: Shade) => void;
  onViewDetails?: (product: Product) => void;
}

export default function Bestsellers({ products, onQuickAdd, onViewDetails }: BestsellersProps) {
  // Filter to bestsellers only
  const bestsellers = products.filter((p) => p.tags.includes("bestseller")).slice(0, 4);

  return (
    <section id="bestsellers" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal text-center mb-4">
            Bestsellers
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="font-body text-charcoal-muted text-center mb-16 max-w-lg mx-auto">
            The shades everyone is talking about. Customer favorites that deliver 
            every time.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {bestsellers.map((product, index) => (
            <ScrollReveal key={product.id} delay={200 + index * 100}>
              <ProductCard
                product={product}
                onQuickAdd={onQuickAdd}
                onViewDetails={onViewDetails}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
