import { api, getMerchantCode } from '../services/api';
import { CategoryDTO } from '../types/Category';
import { ProductDTO, ProductItem, ProductItemDTO } from '../types/Product';


// ********** SYSTEM ADMIN ************ */
// Obtém todos os produtos (SYSTEM)
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter todos os produtos:', error);
    throw error;
  }
};

// ********** ADMIN ************ */
// Função para obter produtos por merchantCode
export const getProductsByMerchantCode = async () => {
  try {
    const merchantCode = getMerchantCode();
    const response = await api.post('/products/store', { merchantCode });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    throw error;
  }
};

// ********** COMUM ************ */
// Obtém um produto pelo ID (admin)
export const getProductById = async (productId: number) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter produto:', error);
    throw error;
  }
};

// Cria um novo produto (admin)
export const createProduct = async (productData: ProductDTO) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar produto:', error);
    throw error;
  }
};

// Atualiza um produto existente (admin)
export const updateProduct = async (productId: number, productData: Partial<ProductDTO>) => {
  try {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};

// Exclui um produto (admin)
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    const merchantCode = getMerchantCode();
    await api.delete(`/products/${productId}`, {
      data: { merchantCode }
    });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw error;
  }
};

// Adiciona um item ao produto (admin)
export const addProductItem = async (productId: number, itemData: ProductItem) => {
  try {
    const response = await api.post(`/products/${productId}/items`, itemData);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar item ao produto:', error);
    throw error;
  }
};

// Atualiza um item do produto (admin)
export const updateProductItem = async (productId: number, itemId: number, itemData: ProductItem) => {
  try {
    const response = await api.put(`/products/${productId}/items/${itemId}`, itemData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar item do produto:', error);
    throw error;
  }
};

// Adiciona produto a uma categoria (admin)
export async function addProductToCategory(productId: number, categoryId: number) {
  try {
    const merchantCode = import.meta.env.VITE_API_BASE_URL;
    const response = await api.post(`/products/add-to-category?productId=${productId}&categoryId=${categoryId}`, {
      merchantCode
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Erro ao vincular produto à categoria:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Erro ao vincular produto à categoria:', error);
    throw error;
  }
}

export const uploadAndUpdateProductImage = async (productId: number, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('merchantCode', getMerchantCode() || '');
    formData.append('productId', productId.toString());

    // Faz a requisição para o endpoint unificado
    await api.post(`/products/${productId}/upload-and-update-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Erro ao fazer upload e atualizar a imagem:', error);
    throw error;
  }
};

// Função para fazer upload de uma imagem
export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/products/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 5000,
    });
    return response.data; // Recebe o nome do arquivo gerado pelo backend
  } catch (error) {
    console.error('Erro ao enviar imagem pro backend:', error);
    throw error;
  }
};

// Função para atualizar a imagem do produto com base no productId e merchantCode
export const updateProductImage = async (productId: number, imageUrl: string) => {
  try {
    const merchantCode = getMerchantCode();
    const response = await api.post(`/products/${productId}/update-image`, {
      merchantCode,
      imageUrl,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar a imagem do produto:', error);
    throw error;
  }
};

// Função para obter uma imagem pelo nome do arquivo
export const getImageByFilename = async (filename: string): Promise<string> => {
  try {
    const response = await api.get(`/products/images/${filename}`, {
      responseType: 'blob' // Define o tipo de resposta como blob para lidar com arquivos binários
    });
    // Cria um URL local para o blob retornado
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error('Erro ao obter imagem:', error);
    throw error;
  }
};

// **********ADMIN************ */

export const getCategories = async (filter?: string) => {
  try {
    const merchantCode = getMerchantCode();
    const response = await api.get('/categories/find', { params: { filter, merchantCode } });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    throw error;
  }
};

export const getCategoriesByMerchantCode = async () => {
  try {
    const merchantCode = getMerchantCode()
    const response = await api.post('/categories/find/store', { merchantCode: merchantCode });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Erro ao buscar categorias por Loja:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar categorias por Loja:', error);
    throw error;
  }
};

// Função para criar uma nova categoria
export const createCategory = async (categoryData: CategoryDTO) => {
  try {
    const response = await api.post('/categories/create', categoryData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};

export const createProductOption = async (productId: number, optionDTO: ProductItemDTO) => {
  try {
    const response = await api.post(`/products/options/${productId}/items`, optionDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar opção de produto:', error);
    throw error;
  }
};

// Exclui um produto (option)
export const deleteOption = async (productId: number, optionId: number): Promise<void> => {
  try {
    const merchantCode = getMerchantCode();
    await api.delete(`/products/options/${productId}/items/${optionId}`, {
      data: { merchantCode }
    });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw error;
  }
};

// Edita um produto (option)
export const editOption = async (productId: number, optionId: number, option: ProductItemDTO): Promise<void> => {
  try {
    const merchantCode = getMerchantCode();
    await api.put(`/products/${productId}/items/${optionId}`, {
      data: { option, merchantCode }
    });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw error;
  }
};

export const changeActiveProduct = async (productId: number, condition: boolean) => {
  try {
    const merchantCode = getMerchantCode();
    const response = await api.put(`/products/active?productId=${productId}&condition=${condition}&merchantCode=${merchantCode}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erro na resposta do servidor:", error.response.data);
    } else if (error.request) {
      console.error("Nenhuma resposta do servidor:", error.request);
    } else {
      console.error("Erro ao configurar a solicitação:", error.message);
    }
  }
};




