import { NextResponse } from "next/server";
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";

const products = productsData as Product[];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json(product);
}

