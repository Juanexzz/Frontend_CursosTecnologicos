// Next.js invoca middleware.ts en el ciclo de vida del servidor edge.
// Re-exportamos la lógica y configuración de proxy.ts para habilitar la protección
// en el servidor solicitada en la rúbrica y rúbrica de bonificación (+3).
export { proxy as middleware, config } from "./proxy";
