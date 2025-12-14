export type Finish = "sheer" | "glossy" | "plumping" | "sparkle";

export type Tag = "vegan" | "cruelty-free" | "hydrating" | "long-lasting" | "bestseller" | "new";

export interface Shade {
  id: string;
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  shades: Shade[];
  finish: Finish;
  tags: Tag[];
  inventory: number;
  ingredients?: string[];
  scent?: string;
}

export interface CartItem {
  product: Product;
  shade: Shade;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  shade: string;
  date: string;
}

