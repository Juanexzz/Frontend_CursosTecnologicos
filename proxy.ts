import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * proxy.ts — Protección de rutas en el servidor Next.js (+3 pts bonificación)
 *
 * NOTA DE SEGURIDAD IMPORTANTE:
 * Esta protección en el middleware/proxy de Next.js decodifica el payload en base64url
 * de la cookie 'token' SIN verificar la firma criptográfica (la clave secreta JWT_SECRET
 * vive exclusivamente en el backend Node.js / Express).
 *
 * Por tanto, este proxy funciona únicamente como protección de EXPERIENCIA DE USUARIO
 * para evitar destellos de contenido privado (flickers) y redirigir oportunamente.
 * La PROTECCIÓN REAL del sistema son las respuestas 401 Unauthorized y 403 Forbidden
 * emitidas por el backend en cada endpoint.
 */

interface JwtPayloadSimple {
  id?: number;
  role?: string;
  exp?: number;
}

function decodePayload(token: string): JwtPayloadSimple | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    // Base64Url a Base64 estándar
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // Buffer disponible en Edge Runtime de Next.js
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(decoded) as JwtPayloadSimple;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const tokenCookie = request.cookies.get("token")?.value;

  const payload = tokenCookie ? decodePayload(tokenCookie) : null;
  const nowInSeconds = Math.floor(Date.now() / 1000);

  // Considerar token válido si existe, se decodificó y no ha expirado
  const isTokenValid = Boolean(
    payload &&
      typeof payload.exp === "number" &&
      payload.exp > nowInSeconds
  );

  // Rutas públicas de autenticación (/login, /registro)
  const isAuthRoute = pathname === "/login" || pathname === "/registro";

  // Si ya tiene sesión activa y vigente, no debe ingresar a /login ni a /registro
  if (isAuthRoute && isTokenValid) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Rutas privadas protegidas
  const isPrivateUserRoute = pathname.startsWith("/mis-inscripciones");
  const isAdminRoute = pathname.startsWith("/admin");

  if (isPrivateUserRoute || isAdminRoute) {
    // Sin token o token expirado -> redirige a /login?redirect=...
    if (!isTokenValid) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.search = `?redirect=${encodeURIComponent(pathname + search)}`;
      return NextResponse.redirect(url);
    }

    // Ruta /admin con role distinto de 'admin' -> redirige al inicio /
    if (isAdminRoute && payload?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configuración del matcher para cubrir exclusivamente las rutas requeridas
export const config = {
  matcher: ["/mis-inscripciones/:path*", "/admin/:path*", "/login", "/registro"]
};
