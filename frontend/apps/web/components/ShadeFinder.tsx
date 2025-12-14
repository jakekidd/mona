"use client";

import { useState } from "react";
import type { Product, Finish } from "@/lib/types";

interface ShadeFinderProps {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
}

type Undertone = "warm" | "cool" | "neutral";
type Vibe = "everyday" | "going-out" | "playful";

interface QuizState {
  step: number;
  undertone?: Undertone;
  finish?: Finish;
  vibe?: Vibe;
}

const undertoneOptions: { value: Undertone; label: string; description: string }[] = [
  { value: "warm", label: "Warm", description: "Golden, peachy, or yellow undertones" },
  { value: "cool", label: "Cool", description: "Pink, red, or bluish undertones" },
  { value: "neutral", label: "Neutral", description: "A mix of warm and cool" },
];

const finishOptions: { value: Finish; label: string; description: string }[] = [
  { value: "sheer", label: "Sheer", description: "Subtle, natural, everyday" },
  { value: "glossy", label: "Glossy", description: "High-shine, glass-like" },
  { value: "plumping", label: "Plumping", description: "Fuller, volumized look" },
  { value: "sparkle", label: "Sparkle", description: "Shimmer and dimension" },
];

const vibeOptions: { value: Vibe; label: string; description: string }[] = [
  { value: "everyday", label: "Everyday", description: "Subtle and wearable" },
  { value: "going-out", label: "Going Out", description: "Bold and statement-making" },
  { value: "playful", label: "Playful", description: "Fun and experimental" },
];

export default function ShadeFinder({ products, onSelectProduct }: ShadeFinderProps) {
  const [quiz, setQuiz] = useState<QuizState>({ step: 0 });
  const [isStarted, setIsStarted] = useState(false);

  const getRecommendations = (): Product[] => {
    let filtered = [...products];
    
    // Filter by finish
    if (quiz.finish) {
      filtered = filtered.filter((p) => p.finish === quiz.finish);
    }
    
    // Score by vibe
    if (quiz.vibe) {
      filtered = filtered.sort((a, b) => {
        const scoreA = getVibeScore(a, quiz.vibe!);
        const scoreB = getVibeScore(b, quiz.vibe!);
        return scoreB - scoreA;
      });
    }
    
    // Return top 3
    return filtered.slice(0, 3);
  };

  const getVibeScore = (product: Product, vibe: Vibe): number => {
    let score = 0;
    
    switch (vibe) {
      case "everyday":
        if (product.tags.includes("bestseller")) score += 2;
        if (product.finish === "sheer") score += 1;
        if (product.name.toLowerCase().includes("nude")) score += 2;
        break;
      case "going-out":
        if (product.finish === "plumping") score += 2;
        if (product.name.toLowerCase().includes("berry") || 
            product.name.toLowerCase().includes("plum") ||
            product.name.toLowerCase().includes("cherry")) score += 2;
        break;
      case "playful":
        if (product.tags.includes("new")) score += 2;
        if (product.finish === "sparkle") score += 2;
        if (product.name.toLowerCase().includes("honey")) score += 1;
        break;
    }
    
    return score;
  };

  const resetQuiz = () => {
    setQuiz({ step: 0 });
    setIsStarted(false);
  };

  const recommendations = quiz.step >= 3 ? getRecommendations() : [];

  if (!isStarted) {
    return (
      <section id="finder" className="py-24 px-6 bg-gradient-to-b from-blush/20 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
            Find Your Perfect Shade
          </h2>
          <p className="font-body text-charcoal-muted mb-8 max-w-lg mx-auto">
            Not sure where to start? Answer a few quick questions and we will 
            point you in the right direction.
          </p>
          <button
            onClick={() => setIsStarted(true)}
            className="btn-gradient px-12 py-5 text-white font-body text-base tracking-wide rounded-sm"
          >
            Take the Quiz
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="finder" className="py-24 px-6 bg-gradient-to-b from-blush/20 to-white">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex gap-2 mb-12 justify-center">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`w-16 h-1 rounded-full transition-colors ${
                quiz.step > step ? "bg-rose-deep" : quiz.step === step ? "bg-charcoal" : "bg-charcoal/20"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Undertone */}
        {quiz.step === 0 && (
          <div className="text-center">
            <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-2">
              What is your undertone?
            </h3>
            <p className="font-body text-charcoal-muted mb-8">
              Look at the veins on your wrist for a hint
            </p>
            <div className="grid gap-4 max-w-md mx-auto">
              {undertoneOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuiz({ ...quiz, step: 1, undertone: option.value })}
                  className="p-5 border border-charcoal/20 rounded-sm text-left hover:border-rose-deep hover:bg-blush/10 transition-all group"
                >
                  <span className="font-display text-lg text-charcoal group-hover:text-rose-deep transition-colors">
                    {option.label}
                  </span>
                  <p className="font-body text-sm text-charcoal-muted mt-1">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Finish */}
        {quiz.step === 1 && (
          <div className="text-center">
            <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-2">
              What finish do you prefer?
            </h3>
            <p className="font-body text-charcoal-muted mb-8">
              There is no wrong answer here
            </p>
            <div className="grid gap-4 max-w-md mx-auto">
              {finishOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuiz({ ...quiz, step: 2, finish: option.value })}
                  className="p-5 border border-charcoal/20 rounded-sm text-left hover:border-rose-deep hover:bg-blush/10 transition-all group"
                >
                  <span className="font-display text-lg text-charcoal group-hover:text-rose-deep transition-colors">
                    {option.label}
                  </span>
                  <p className="font-body text-sm text-charcoal-muted mt-1">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setQuiz({ ...quiz, step: 0 })}
              className="mt-6 font-body text-sm text-charcoal-muted hover:text-charcoal transition-colors underline underline-offset-4"
            >
              Go back
            </button>
          </div>
        )}

        {/* Step 3: Vibe */}
        {quiz.step === 2 && (
          <div className="text-center">
            <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-2">
              What is the vibe?
            </h3>
            <p className="font-body text-charcoal-muted mb-8">
              When will you be wearing this most?
            </p>
            <div className="grid gap-4 max-w-md mx-auto">
              {vibeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuiz({ ...quiz, step: 3, vibe: option.value })}
                  className="p-5 border border-charcoal/20 rounded-sm text-left hover:border-rose-deep hover:bg-blush/10 transition-all group"
                >
                  <span className="font-display text-lg text-charcoal group-hover:text-rose-deep transition-colors">
                    {option.label}
                  </span>
                  <p className="font-body text-sm text-charcoal-muted mt-1">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setQuiz({ ...quiz, step: 1 })}
              className="mt-6 font-body text-sm text-charcoal-muted hover:text-charcoal transition-colors underline underline-offset-4"
            >
              Go back
            </button>
          </div>
        )}

        {/* Results */}
        {quiz.step >= 3 && (
          <div className="text-center">
            <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-2">
              Your Perfect Matches
            </h3>
            <p className="font-body text-charcoal-muted mb-8">
              Based on your preferences, we think you will love these
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommendations.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onSelectProduct?.(product)}
                  className="group text-left"
                >
                  <div 
                    className="aspect-square rounded-sm mb-3 transition-transform group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${product.shades[0]?.hex ?? "#f5d0d6"}40 0%, ${product.shades[0]?.hex ?? "#f5d0d6"}20 100%)`,
                    }}
                  />
                  <h4 className="font-display text-lg text-charcoal group-hover:text-rose-deep transition-colors">
                    {product.name}
                  </h4>
                  <p className="font-body text-sm text-charcoal-muted">
                    ${product.price}
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={resetQuiz}
              className="font-body text-sm text-charcoal-muted hover:text-charcoal transition-colors underline underline-offset-4"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

