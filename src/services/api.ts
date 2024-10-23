import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const getTokenFromLocalStorage = (): string => localStorage.getItem('APP_TOKEN') || '';
export const getCartCodeFromLocalStorage = (): string => localStorage.getItem('cartCode') || '';
export const getMerchantCode = (): string => localStorage.getItem('MERCHANT_CODE') || ''

export const saveCartCodeToLocalStorage = (cartCode: string) => {
  localStorage.setItem('cartCode', cartCode);
};

export const getToken = (): string => {
  return localStorage.getItem('APP_TOKEN') || '';
};

export const getUserIdFromLocalStorage = (): number | null => {
  const token = getTokenFromLocalStorage();
  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.userId; // Ajustar conforme a estrutura real do token
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  }
  return null;
};

export const getUserId = (): number | null => {
  const token = getToken();
  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.userId;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  }
  return null;
};
