import { NextResponse } from "next/server";
import productsData from "@/data/products.json";

export async function GET() {
  // Simulate network delay in development
  // await new Promise((resolve) => setTimeout(resolve, 100));
  
  return NextResponse.json(productsData);
}

