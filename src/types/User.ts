import { AddressDTO } from "./Address";

export interface User {
  id: number;
  storeId: number;
  accessLevel?: string;
  merchantCode?: string;
  name: string;
  email: string;
  password?: string;
  telephone: string;
}

export interface UserDetailsDTO {
  id: number;
  merchantCode?: string;
  accessLevel?: string;
  name: string;
  email: string;
  password?: string;
  telephone: string;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
  address?: AddressDTO;
  role?: string;
}

export interface AuthContextState {
  authenticated: boolean;
  user: UserDetailsDTO | null;
  merchantCode?: string;
}

export interface AuthContextActions {
  type: 'LOGIN' | 'LOGOUT' | 'SET_USER';
  payload?: any;
}

export interface AuthResponse {
  token: string;
}