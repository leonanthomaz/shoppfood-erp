import { api, getMerchantCode } from "../services/api";
import { StoreFormData } from "../types/Store";

export const getStoreByMerchantCode = async () => {
    try {
      const merchantCode = getMerchantCode();
      const response = await api.get(`/store/find?merchantCode=${merchantCode}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter loja pelo código MerchantCode:', error);
      throw error;
    }
};

export const createStore = async (formData: StoreFormData) => {
  try {
    await api.post(`/store/create`, formData);
  } catch (error) {
    console.error('Erro ao criar a loja:', error);
  }
}

export const activeStore = async (merchantCode: string, condition: boolean) => {
  try {
    await api.put(`/store/active`, { params: merchantCode, condition});
  } catch (error) {
    console.error('Falha ao atualizar status:', error);
  }
}

// Função para obter uma imagem pelo nome do arquivo
export const getLogoByFilename = async (filename: string): Promise<string> => {
  try {
    const merchantCode = getMerchantCode()
    const response = await api.get(`/store/store/logo/${merchantCode}/${filename}`, {
      responseType: 'blob' // Define o tipo de resposta como blob para lidar com arquivos binários
    });
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error('Erro ao obter imagem:', error);
    throw error;
  }
};

// Função para obter uma imagem pelo nome do arquivo
export const getHeaderByFilename = async (filename: string): Promise<string> => {
  try {
    const merchantCode = getMerchantCode()
    const response = await api.get(`/store/store/header/${merchantCode}/${filename}`, {
      responseType: 'blob' // Define o tipo de resposta como blob para lidar com arquivos binários
    });
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error('Erro ao obter imagem:', error);
    throw error;
  }
};

export const openStore = async (status: boolean) => {
  try {
    const merchantCode = getMerchantCode();
    await api.put(`/store/open/${merchantCode}/${status}`);
  } catch (error) {
    console.error('Erro ao abrir/fechar a loja:', error);
  }
}

