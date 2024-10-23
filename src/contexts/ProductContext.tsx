import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import {
  getProductsByMerchantCode,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadAndUpdateProductImage,
  getCategoriesByMerchantCode,
  addProductToCategory as apiAddProductToCategory,
  createCategory,
  createProductOption as apiCreateProductOption,
  getCategories,
  changeActiveProduct,
  getImageByFilename as apiGetImageByFilename, 
  editOption as apiEditOption,
  deleteOption as apiDeleteOption
} from '../functions/Product';
import { Product, ProductDTO, ProductItemDTO } from '../types/Product';
import { Category, CategoryDTO } from '../types/Category';

interface CategoryWithProductType {
  id: number;
  name: string;
  products: Product[];
}

interface ProductContextData {
  categoryWithProduct: CategoryWithProductType[];
  products: Product[];
  categories: Category[];
  loadProducts: () => Promise<void>;
  createNewProduct: (product: ProductDTO) => Promise<void>;
  updateExistingProduct: (productId: number, productData: Partial<ProductDTO>) => Promise<void>;
  removeProduct: (productId: number) => Promise<void>;
  uploadProductImage: (productId: number, file: File) => Promise<void>;
  addProductToCategory: (productId: number, categoryId: number) => Promise<void>;
  createNewCategory: (categoryData: CategoryDTO) => Promise<void>;
  createProductOption: (productId: number, optionDTO: ProductItemDTO) => Promise<void>;
  fetchCategories: () => Promise<void>;
  activeProduct: (productId: number, condition: boolean) => Promise<void>;
  getImageByFilename: (filename: string) => Promise<string>;
  editOption: (productId: number, optionId: number, option: ProductItemDTO) => Promise<void>;
  deleteOption: (productId: number, optionId: number) => Promise<void>;

}

const ProductContext = createContext<ProductContextData>({} as ProductContextData);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryWithProduct, setProduct] = useState<CategoryWithProductType[]>([]);

  const loadProducts = async () => {
    try {
      const data = await getProductsByMerchantCode();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const createNewProduct = async (product: ProductDTO) => {
    try {
      await createProduct(product);
      await loadProducts();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  const updateExistingProduct = async (productId: number, productData: Partial<ProductDTO>) => {
    try {
      await updateProduct(productId, productData);
      await loadProducts();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      await loadProducts();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const uploadProductImage = async (productId: number, file: File) => {
    try {
      await uploadAndUpdateProductImage(productId, file);
      await loadProducts();
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  const addProductToCategory = async (productId: number, categoryId: number) => {
    try {
      await apiAddProductToCategory(productId, categoryId);
      await loadProducts();
    } catch (error) {
      console.error('Erro ao vincular produto à categoria:', error);
    }
  };

  const createNewCategory = async (categoryData: CategoryDTO) => {
    try {
      await createCategory(categoryData);
      await getCategoriesByMerchantCode();
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  const createProductOption = async (productId: number, optionDTO: ProductItemDTO) => {
    try {
      await apiCreateProductOption(productId, optionDTO);
    } catch (error) {
      console.error('Erro ao criar opção de produto:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      setProduct(data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const activeProduct = async (productId: number, condition: boolean) => {
    try {
      const response = await changeActiveProduct(productId, condition)
      return response;
    } catch (error) {
      console.error("Erro ao configurar a solicitação:", error);
    }
  };

  const getImageByFilename = async (filename: string): Promise<string> => {
    try {
      return await apiGetImageByFilename(filename);
    } catch (error) {
      console.error('Error getting image by filename:', error);
      throw error;
    }
  };

  const editOption = async (productId: number, optionId: number, option: ProductItemDTO) => {
    try {
      await apiEditOption(productId, optionId, option)
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      throw error;
    }
  }

  const deleteOption = async (productId: number, optionId: number) => {
    try {
      await apiDeleteOption(productId, optionId)
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      throw error;
    }
  }

  useEffect(() => {
    loadProducts();
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loadProducts,
        createNewProduct,
        updateExistingProduct,
        removeProduct,
        uploadProductImage,
        addProductToCategory,
        createNewCategory,
        createProductOption,
        fetchCategories,
        categoryWithProduct,
        activeProduct,
        getImageByFilename,
        editOption,
        deleteOption
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
