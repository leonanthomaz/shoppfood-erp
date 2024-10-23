// src/types/Product.ts

import { Category } from "./Category";

export interface Product {
  id: number;
  codeProduct: string;
  merchantCode: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  codeBar: string;
  stock: number;
  getMinimumRequiredOptions: number;
  active?: boolean;
  category: Category | null;
  items: ProductItem[];
}

export interface ProductDTO {
  id?: number;
  name: string;
  merchantCode: string;
  description: string;
  price: number;
  imageUrl: string;
  codeBar: string;
  getMinimumRequiredOptions: number;
  active?: boolean;
  stock: number;
  categoryId: number;
}

export interface ProductItem {
  id: number;
  codeOption: string;
  merchantCode: string;
  name: string;
  additionalPrice: number;
}

export interface ProductItemDTO {
  name: string;
  merchantCode: string;
  additionalPrice: number;
}
