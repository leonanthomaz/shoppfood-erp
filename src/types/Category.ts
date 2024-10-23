import { Product } from "./Product";

// Tipo para Categoria
export interface Category {
  id: number;
  name: string;
  merchantCode: string;
  description: string;
  products?: Product[];
}

// DTO para Categoria
export interface CategoryDTO {
  id: number;
  name: string;
  description: string;
}

export interface CategoryWithProduct {
  id: number;
  name: string;
  products?: Product[];
}
