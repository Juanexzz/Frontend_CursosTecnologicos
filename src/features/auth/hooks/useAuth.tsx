"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { User, LoginRequest, RegisterRequest } from "../domain/user.types";
import { authService } from "../services/auth.service";
import {
  getStoredToken,
  getStoredUser,
  setStoredAuth,
  clearStoredAuth
} from "../../common/http";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hidratar la sesión desde almacenamiento local al montar
  useEffect(() => {
    try {
      const savedToken = getStoredToken();
      const savedUser = getStoredUser<User>();

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
      }
    } catch (e) {
      console.error("Error al cargar la sesión guardada:", e);
      clearStoredAuth();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    setStoredAuth(response.token, response.user);
    setToken(response.token);
    setUser(response.user);
  }, []);

  const register = useCallback(async (userData: RegisterRequest) => {
    await authService.register(userData);
    // Iniciar sesión automáticamente después de registrar
    const loginRes = await authService.login({
      email: userData.email,
      password: userData.password
    });
    setStoredAuth(loginRes.token, loginRes.user);
    setToken(loginRes.token);
    setUser(loginRes.user);
  }, []);

  const logout = useCallback(() => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isAdmin: user?.role === "admin",
      isLoading,
      login,
      register,
      logout
    }),
    [user, token, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
