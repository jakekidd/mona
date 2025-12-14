"use client";

import { useState } from "react";
import Link from "next/link";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/lib/cart";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-xl tracking-wide text-charcoal hover:text-charcoal-light">
            Mona Empire
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="#bestsellers" 
              className="text-sm font-body text-charcoal-muted hover:text-charcoal transition-colors"
            >
              Bestsellers
            </Link>
            <Link 
              href="#shop" 
              className="text-sm font-body text-charcoal-muted hover:text-charcoal transition-colors"
            >
              Shop All
            </Link>
            <Link 
              href="#about" 
              className="text-sm font-body text-charcoal-muted hover:text-charcoal transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-charcoal hover:text-charcoal-light transition-colors"
            aria-label="Open cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {/* Cart count badge */}
            <span 
              className={`absolute -top-1 -right-1 w-5 h-5 bg-rose-deep text-white text-xs rounded-full flex items-center justify-center font-body transition-transform ${
                count > 0 ? "scale-100" : "scale-0"
              }`}
            >
              {count > 9 ? "9+" : count}
            </span>
          </button>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
