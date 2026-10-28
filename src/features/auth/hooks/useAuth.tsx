"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from "react";
import { User, LoginRequest, RegisterRequest } from "../domain/user.types";
import { authService } from "../services/auth.service";
import {
  getTokenCookie,
  setTokenCookie,
  removeTokenCookie
} from "../services/tokenStorage";
import { setTokenGetter, setUnauthorizedHandler } from "../../common/http";

export type AuthStatus = "loading" | "authenticated" | "guest";

interface AuthContextType {
  user: User | null;
  token: string | null;
  status: AuthStatus;
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
  const [status, setStatus] = useState<AuthStatus>("loading");

  const logout = useCallback(() => {
    removeTokenCookie();
    setToken(null);
    setUser(null);
    setStatus("guest");
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, []);

  // Registrar manejadores en http.ts
  useEffect(() => {
    setTokenGetter(() => getTokenCookie());
    setUnauthorizedHandler(() => {
      removeTokenCookie();
      setToken(null);
      setUser(null);
      setStatus("guest");
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        const current = window.location.pathname + window.location.search;
        window.location.href = `/login?redirect=${encodeURIComponent(current)}`;
      }
    });
  }, []);

  // Hidratar la sesión desde la cookie 'token' y validar con GET /api/auth/me
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      const savedToken = getTokenCookie();
      if (!savedToken) {
        if (mounted) {
          setToken(null);
          setUser(null);
          setStatus("guest");
        }
        return;
      }

      try {
        setToken(savedToken);
        const res = await authService.me();
        if (mounted) {
          setUser(res.user);
          setStatus("authenticated");
        }
      } catch {
        // Si el token es inválido, expiró o respondió 401
        removeTokenCookie();
        if (mounted) {
          setToken(null);
          setUser(null);
          setStatus("guest");
        }
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    setTokenCookie(response.token);
    setToken(response.token);
    setUser(response.user);
    setStatus("authenticated");
  }, []);

  const register = useCallback(
    async (userData: RegisterRequest) => {
      await authService.register(userData);
      // Tras registrarse exitosamente, inicia sesión automáticamente
      const loginRes = await authService.login({
        email: userData.email,
        password: userData.password
      });
      setTokenCookie(loginRes.token);
      setToken(loginRes.token);
      setUser(loginRes.user);
      setStatus("authenticated");
    },
    []
  );

  const value = useMemo(
    () => ({
      user,
      token,
      status,
      isAuthenticated: status === "authenticated" && Boolean(user),
      isAdmin: user?.role === "admin",
      isLoading: status === "loading",
      login,
      register,
      logout
    }),
    [user, token, status, login, register, logout]
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
