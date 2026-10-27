const rawHost = process.env.NEXT_PUBLIC_API_HOST;

if (!rawHost) {
  throw new Error(
    "Falta la variable de entorno NEXT_PUBLIC_API_HOST. Debe configurarse apuntando al backend (ej. http://localhost:4000)."
  );
}

export const API_HOST = rawHost.replace(/\/+$/, "");
export const API_BASE_URL = `${API_HOST}/api`;
