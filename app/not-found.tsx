import React from "react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="py-24 px-4 flex flex-col items-center justify-center text-center space-y-6">
      <div className="relative">
        <span className="text-8xl sm:text-9xl font-black text-gray-200 dark:text-gray-800 tracking-tighter">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-4xl">
          🚀
        </span>
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Página no encontrada
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          La ruta que estás buscando no existe en NexTech Academy o fue trasladada a otra ubicación.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
        >
          Ir al Inicio
        </Link>
        <Link
          href="/cursos"
          className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm transition-all"
        >
          Explorar Cursos
        </Link>
      </div>
    </div>
  );
}
