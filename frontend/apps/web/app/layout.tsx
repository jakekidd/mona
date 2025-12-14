import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { CartProvider } from "@/lib/cart";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mona Empire | Boutique Lip Gloss",
  description: "Luxurious lip glosses crafted with care. Find your perfect shade.",
  icons: {
    icon: "/images/me_favicon.png",
    apple: "/images/me_favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
