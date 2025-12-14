"use client";

import ScrollReveal from "./ScrollReveal";
import type { Review } from "@/lib/types";

interface ReviewsProps {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-rose-deep" : "text-charcoal/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <section className="py-28">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingInline: "clamp(24px, 6vw, 96px)",
        }}
      >
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal text-left mb-6">
            What People Are Saying
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="font-body text-charcoal-muted text-left mb-16 max-w-2xl">
            Real words from real people. No filters, no paid promotions.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {reviews.map((review, index) => (
            <ScrollReveal key={review.id} delay={200 + index * 100}>
              <div className="p-8 bg-white border border-charcoal/10 rounded-sm card-hover">
                <div className="mb-5">
                  <StarRating rating={review.rating} />
                </div>
                <p className="font-body text-charcoal leading-relaxed text-base md:text-[15px] mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="pt-5 border-t border-charcoal/10 flex items-end justify-between gap-6">
                  <div className="min-w-0">
                    <p className="font-body text-sm text-charcoal font-medium">
                      {review.author}
                    </p>
                    <p className="font-body text-xs text-charcoal-muted mt-1 truncate">
                      {review.shade}
                    </p>
                  </div>
                  <p className="font-body text-xs text-charcoal-muted whitespace-nowrap">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
