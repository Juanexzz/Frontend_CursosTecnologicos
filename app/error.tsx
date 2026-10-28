"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Registro de error en consola de cliente
    console.error("Error en la aplicación:", error);
  }, [error]);

  return (
    <div className="py-20 px-4 flex flex-col items-center justify-center text-center space-y-6 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center text-3xl shadow-sm">
        ⚠️
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">
          Ha ocurrido un error inesperado
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Lo sentimos, ocurrió un problema al cargar esta sección. Puedes intentar recargar la vista o volver al catálogo principal.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Intentar nuevamente
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
