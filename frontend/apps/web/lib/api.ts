import type { Product } from "./types";

const API_BASE = "/api";

interface ApiError {
  error: string;
}

interface CheckoutRequest {
  items: {
    productId: string;
    shadeId: string;
    quantity: number;
  }[];
  email?: string;
}

interface CheckoutResponse {
  success: boolean;
  message: string;
  sessionId: string;
  url?: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json() as ApiError;
    throw new Error(error.error || "API request failed");
  }
  return response.json() as Promise<T>;
}

export const api = {
  products: {
    async list(): Promise<Product[]> {
      const response = await fetch(`${API_BASE}/products`);
      return handleResponse<Product[]>(response);
    },
    
    async get(id: string): Promise<Product> {
      const response = await fetch(`${API_BASE}/products/${id}`);
      return handleResponse<Product>(response);
    },
  },
  
  checkout: {
    async create(data: CheckoutRequest): Promise<CheckoutResponse> {
      const response = await fetch(`${API_BASE}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse<CheckoutResponse>(response);
    },
  },
};

