"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, update, remove, total, count } = useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/10">
            <h2 className="font-display text-xl text-charcoal">
              Your Bag {count > 0 && <span className="text-charcoal-muted">({count})</span>}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-charcoal-muted hover:text-charcoal transition-colors"
              aria-label="Close cart"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-blush/50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-8 h-8 text-rose-deep"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <p className="text-charcoal-muted font-body text-sm">
                  Your bag is empty
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 text-sm font-body text-rose-deep hover:text-berry transition-colors underline underline-offset-4"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.shade.id}`}
                    className="flex gap-4"
                  >
                    {/* Product Image */}
                    <div 
                      className="relative w-20 h-24 rounded-sm overflow-hidden flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${item.shade.hex}40 0%, ${item.shade.hex}20 100%)`,
                      }}
                    >
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base text-charcoal truncate">
                        {item.product.name}
                      </h3>
                      <p className="font-body text-xs text-charcoal-muted mt-0.5">
                        {item.shade.name}
                      </p>
                      <p className="font-body text-sm text-charcoal mt-1">
                        ${item.product.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => update(item.product.id, item.shade.id, item.quantity - 1)}
                          className="w-7 h-7 border border-charcoal/20 rounded-sm flex items-center justify-center text-charcoal hover:border-charcoal transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="font-body text-sm text-charcoal w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => update(item.product.id, item.shade.id, item.quantity + 1)}
                          className="w-7 h-7 border border-charcoal/20 rounded-sm flex items-center justify-center text-charcoal hover:border-charcoal transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => remove(item.product.id, item.shade.id)}
                      className="p-1 text-charcoal-muted hover:text-charcoal transition-colors self-start"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Subtotal & Checkout */}
          <div className="border-t border-charcoal/10 px-6 py-5">
            <div className="flex justify-between items-center mb-4">
              <span className="font-body text-charcoal-muted">Subtotal</span>
              <span className="font-display text-lg text-charcoal">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              disabled={items.length === 0}
              className="w-full py-4 bg-charcoal text-white font-body text-sm tracking-wide rounded-sm hover:bg-charcoal-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
            <p className="mt-3 text-xs text-charcoal-muted text-center font-body">
              Shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
