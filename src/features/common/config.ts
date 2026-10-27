export const API_HOST =
  process.env["NEXT_PUBLIC_API_HOST"] ?? "http://localhost:4000";

export const API_BASE_URL = `${API_HOST.replace(/\/+$/, "")}/api`;
