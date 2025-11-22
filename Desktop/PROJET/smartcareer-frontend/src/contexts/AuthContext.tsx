import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, api } from '../services/api';

interface User {
  id: number;
  email: string;
  fullName: string;
  specialty?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error: any) {
      // Ne pas bloquer l'application si le backend n'est pas disponible
      console.warn('Error fetching user (backend may not be running):', error?.message || error);
      // Ne supprimer le token que si c'est une erreur d'authentification (401/403)
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        localStorage.removeItem('token');
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    await authService.login({ email, password });
    await fetchUser();
  };

  const register = async (email: string, password: string, fullName: string) => {
    await authService.register({ email, password, fullName });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

