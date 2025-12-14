"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Bestsellers from "@/components/Bestsellers";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
// import ShadeFinder from "@/components/ShadeFinder";
import Reviews from "@/components/Reviews";
import Features from "@/components/Features";
import SectionDivider from "@/components/SectionDivider";
import { useCart } from "@/lib/cart";
import type { Product, Shade, Review } from "@/lib/types";
import productsData from "@/data/products.json";
import reviewsData from "@/data/reviews.json";

// Cast the JSON data to our types
const products = productsData as Product[];
const reviews = reviewsData as Review[];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { add } = useCart();

  const handleQuickAdd = (product: Product, shade: Shade) => {
    add(product, shade);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        
        <Bestsellers 
          products={products} 
          onQuickAdd={handleQuickAdd}
          onViewDetails={handleViewDetails}
        />
        
        <SectionDivider />
        
        {/* ShadeFinder commented out for now
        <ShadeFinder 
          products={products}
          onSelectProduct={handleViewDetails}
        />
        
        <SectionDivider />
        */}
        
        <ProductGrid 
          products={products}
          onQuickAdd={handleQuickAdd}
          onViewDetails={handleViewDetails}
        />
        
        <SectionDivider />
        
        <Features />
        
        <SectionDivider />
        
        <Reviews reviews={reviews} />
      </main>
      <Footer />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleQuickAdd}
      />
    </>
  );
}
