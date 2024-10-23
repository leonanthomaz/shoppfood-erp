import { User, AuthResponse } from '../types/User';
import { api } from '../services/api';

export const login = async (email: string, password: string): Promise<string> => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    return data.token;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const register = async (name: string, email: string, password: string, role: string): Promise<User> => {
  try {
    const { data } = await api.post('/auth/register', { name, email, password, role });
    const response: User = data as User;
    return response;
  } catch (error) {
    console.error('Erro ao registrar:', error);
    throw error;
  }
};

export const apiLoginWithGoogle = async (token: string): Promise<AuthResponse> => {
  try {
    const { data } = await api.post('/auth/login/oauth2/google', { token });
    return data;
  } catch (error) {
    return { token: '' };
  }
};

export const getUserDetails = async (token: string): Promise<User> => {
  try {
    const { data } = await api.get('/users/details', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // localStorage.setItem("MERCHANT_CODE", data.merchantCode)
    return data;
  } catch (error) {
    console.error('Erro ao recuperar detalhes do usuário:', error);
    throw error;
  }
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    await api.post('/password/recover-password', { email }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao solicitar recuperação de senha:', error);
  }
};

// Atualize a função resetPassword para incluir o token
export const resetPasswordNewStore = async (token: string, newPassword: string): Promise<void> => {
  try {
    await api.post('/password/reset-password/new-store', { token, newPassword }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    throw error; // Opcional: Propagar o erro para tratamento posterior
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  try {
    await api.post('/password/reset-password', { token, newPassword }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    throw error; // Opcional: Propagar o erro para tratamento posterior
  }
};

export const updateUserDetails = async (editableUser: Partial<User>): Promise<User> => {
  try {
    const { data } = await api.put('/users/update', editableUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response: User = data as User;
    return response;
  } catch (error) {
    console.error('Erro ao atualizar detalhes do usuário:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get(`/users`);
    return response.data
  } catch(error){
    console.error("Erro ao listar usuarios.")
  }
}

export const deleteUserById = async (userId: number): Promise<void> => {
  try {
    await api.delete(`/users/${userId}`);
  } catch(error){
    console.error("Erro ao listar usuarios.")
  }
}
