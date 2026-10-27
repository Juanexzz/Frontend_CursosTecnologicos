import { API_BASE_URL } from "./config";

export interface ApiFieldError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly errors?: ApiFieldError[];

  constructor(status: number, message: string, errors?: ApiFieldError[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

// Compatibilidad hacia atrás si algún archivo usaba HttpError
export { ApiError as HttpError };

type TokenGetter = () => string | null;
type UnauthorizedHandler = () => void;

let registeredTokenGetter: TokenGetter = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("nextech_token");
};

let registeredUnauthorizedHandler: UnauthorizedHandler = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("nextech_token");
  localStorage.removeItem("nextech_user");
  if (!window.location.pathname.startsWith("/login")) {
    window.location.href = "/login";
  }
};

export function setTokenGetter(getter: TokenGetter): void {
  registeredTokenGetter = getter;
}

export function setUnauthorizedHandler(handler: UnauthorizedHandler): void {
  registeredUnauthorizedHandler = handler;
}

// Helpers para almacenamiento seguro
const TOKEN_KEY = "nextech_token";
const USER_KEY = "nextech_user";

export function getStoredToken(): string | null {
  return registeredTokenGetter();
}

export function setStoredAuth(token: string, user: unknown): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser<T>(): T | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = new URL(
    endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`
  );

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const token = registeredTokenGetter();
  const headers = new Headers(options.headers || {});

  // Enviar JSON por defecto, dejando pasar FormData sin forzar Content-Type
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers
  });

  // Manejo de respuestas 204 No Content
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  // Parsear cuerpo JSON si existe
  let data: unknown = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  // Manejo de 401 Unauthorized: invoca manejador registrado excepto en login/registro
  const isAuthEndpoint =
    endpoint.includes("/auth/login") ||
    endpoint.includes("/auth/register") ||
    endpoint.includes("/auth/registro");

  if (response.status === 401 && !isAuthEndpoint) {
    registeredUnauthorizedHandler();
  }

  if (!response.ok) {
    const errorBody = data as { message?: string; errors?: ApiFieldError[] } | null;
    const message =
      errorBody?.message ||
      `Error en la petición: ${response.status} ${response.statusText}`;
    throw new ApiError(response.status, message, errorBody?.errors);
  }

  return data as T;
}

export const http = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body)
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body)
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" })
};
