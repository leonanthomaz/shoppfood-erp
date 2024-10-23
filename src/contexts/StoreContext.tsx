import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { 
  createStore, 
  getStoreByMerchantCode, 
  getLogoByFilename as apiGetLogoeByFilename, 
  getHeaderByFilename as apiGetHeaderByFilename, 
  openStore as apiOpenStore
} from '../functions/Store';
import { Store, StoreFormData } from '../types/Store';

interface StoreContextData {
  store: Store | undefined;
  createNewStore: (store: StoreFormData) => Promise<void>;
  updateActiveStore: (merchantCode: string, condition: boolean) => Promise<void>
  getPrimaryByFilename: (filename: string) => Promise<string>;
  getSecondaryByFilename: (filename: string) => Promise<string>;
  activeStore: (isStoreOpen: boolean) => Promise<void>;
}

const StoreContext = createContext<StoreContextData>({} as StoreContextData);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [store, setStore] = useState<Store>();
  
  useEffect(() => {
    const getStore = async () => {
      try {
        const response = await getStoreByMerchantCode();
        setStore(response);
      } catch (error) {
        console.error('Erro ao buscar lojas:', error);
      }
    };
    getStore()
  }, [])

  const createNewStore = async (store: StoreFormData) => {
    try {
      await createStore(store);
    } catch (error) {
      console.error('Erro ao criar loja:', error);
    }
  };

  const updateActiveStore = async (merchantCode: string, condition: boolean) => {
    try {
      await activeStore(merchantCode, condition);
    } catch (error) {
      console.error('Falha ao atualizar status da loja:', error);
    }
  }

  const getPrimaryByFilename = async (filename: string): Promise<string> => {
    try {
      return await apiGetLogoeByFilename(filename);
    } catch (error) {
      console.error('Error getting image by filename:', error);
      throw error;
    }
  };

  const getSecondaryByFilename = async (filename: string): Promise<string> => {
    try {
      return await apiGetHeaderByFilename(filename);
    } catch (error) {
      console.error('Error getting image by filename:', error);
      throw error;
    }
  };

  const activeStore = async (status: boolean) => {
    try {
      await apiOpenStore(status);
    } catch (error) {
      console.error('Erro ao abrir/fechar loja:', error);
    }
  }

  return (
    <StoreContext.Provider value={{ 
      store, 
      createNewStore, 
      updateActiveStore,
      getPrimaryByFilename,
      getSecondaryByFilename,
      activeStore
      }}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook personalizado para usar o contexto de Store
export const useStore = () => useContext(StoreContext);
