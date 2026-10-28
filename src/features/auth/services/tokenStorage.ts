// Módulo de almacenamiento y sincronización del token en cookie
// Cumple con la decisión de diseño de CONTEXTO.md / RUBRICA_ENTREGA3.md:
// - Cookie única llamada 'token'
// - path=/, SameSite=Lax, Secure en https
// - Expiración leída del claim exp del JWT decodificado en base64url
// - Sin uso simultáneo de localStorage

export const TOKEN_COOKIE_NAME = "token";

/**
 * Decodifica de forma segura la carga útil (payload) de un token JWT
 * sin verificar la firma criptográfica (la clave secreta reside en el backend).
 */
export function decodeJwtPayload<T = Record<string, unknown>>(token: string): T | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as T;
  } catch {
    return null;
  }
}

/**
 * Lee el token desde la cookie del navegador (document.cookie).
 */
export function getTokenCookie(): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split("=");
    if (name === TOKEN_COOKIE_NAME) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return null;
}

/**
 * Guarda el token en la cookie 'token' con la expiración correspondiente
 * al claim 'exp' del JWT. SameSite=Lax, path=/ y Secure si el protocolo es https:.
 */
export function setTokenCookie(token: string): void {
  if (typeof document === "undefined") return;

  const payload = decodeJwtPayload<{ exp?: number }>(token);
  let expiresAttr = "";

  if (payload && typeof payload.exp === "number") {
    // exp en JWT está en segundos desde epoch
    const expirationDate = new Date(payload.exp * 1000);
    expiresAttr = `; expires=${expirationDate.toUTCString()}`;
  }

  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
  const secureAttr = isSecure ? "; Secure" : "";

  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(
    token
  )}${expiresAttr}; path=/; SameSite=Lax${secureAttr}`;
}

/**
 * Elimina la cookie 'token' configurando una expiración en el pasado.
 */
export function removeTokenCookie(): void {
  if (typeof document === "undefined") return;
  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
  const secureAttr = isSecure ? "; Secure" : "";
  document.cookie = `${TOKEN_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax${secureAttr}`;
}
