"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import type { Product, Shade, Finish, Tag } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  onQuickAdd?: (product: Product, shade: Shade) => void;
  onViewDetails?: (product: Product) => void;
}

const finishOptions: { value: Finish | "all"; label: string }[] = [
  { value: "all", label: "All Finishes" },
  { value: "sheer", label: "Sheer" },
  { value: "glossy", label: "Glossy" },
  { value: "plumping", label: "Plumping" },
  { value: "sparkle", label: "Sparkle" },
];

const tagOptions: { value: Tag | "all"; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "vegan", label: "Vegan" },
  { value: "cruelty-free", label: "Cruelty-Free" },
  { value: "hydrating", label: "Hydrating" },
  { value: "long-lasting", label: "Long-Lasting" },
];

export default function ProductGrid({ products, onQuickAdd, onViewDetails }: ProductGridProps) {
  const [finishFilter, setFinishFilter] = useState<Finish | "all">("all");
  const [tagFilter, setTagFilter] = useState<Tag | "all">("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesFinish = finishFilter === "all" || product.finish === finishFilter;
      const matchesTag = tagFilter === "all" || product.tags.includes(tagFilter);
      return matchesFinish && matchesTag;
    });
  }, [products, finishFilter, tagFilter]);

  return (
    <section id="shop" className="py-24 bg-gradient-to-b from-white to-blush/10">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingInline: "clamp(24px, 6vw, 96px)",
        }}
      >
        <h2 className="font-display text-3xl md:text-4xl text-charcoal text-left mb-6">
          Shop All
        </h2>
        <p className="font-body text-charcoal-muted text-left mb-14 max-w-2xl">
          Browse the full collection. Filters are here if you want them.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-start gap-4 mb-10">
          {/* Finish Filter */}
          <div className="relative">
            <select
              value={finishFilter}
              onChange={(e) => setFinishFilter(e.target.value as Finish | "all")}
              style={{ padding: "1rem 3rem 1rem 1.5rem" }}
              className="appearance-none border-2 border-charcoal/20 rounded font-body text-base text-charcoal bg-white cursor-pointer hover:border-charcoal/40 focus:outline-none focus:border-rose-deep transition-colors"
            >
              {finishOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-muted pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Tag Filter */}
          <div className="relative">
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value as Tag | "all")}
              style={{ padding: "1rem 3rem 1rem 1.5rem" }}
              className="appearance-none border-2 border-charcoal/20 rounded font-body text-base text-charcoal bg-white cursor-pointer hover:border-charcoal/40 focus:outline-none focus:border-rose-deep transition-colors"
            >
              {tagOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-muted pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Clear Filters */}
          {(finishFilter !== "all" || tagFilter !== "all") && (
            <button
              onClick={() => {
                setFinishFilter("all");
                setTagFilter("all");
              }}
              style={{ padding: "1rem 2rem" }}
              className="font-body text-base text-charcoal-muted hover:text-charcoal transition-colors underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <p className="text-left font-body text-sm text-charcoal-muted mb-8">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickAdd={onQuickAdd}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="font-body text-charcoal-muted mb-4">
              No products match your filters.
            </p>
            <button
              onClick={() => {
                setFinishFilter("all");
                setTagFilter("all");
              }}
              className="font-body text-base text-rose-deep hover:text-berry transition-colors underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
