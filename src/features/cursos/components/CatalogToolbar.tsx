"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function CatalogToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [categoria, setCategoria] = useState(searchParams.get("categoria") || "all");
  const [precioMin, setPrecioMin] = useState(searchParams.get("precioMin") || "");
  const [precioMax, setPrecioMax] = useState(searchParams.get("precioMax") || "");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setQ(searchParams.get("q") || "");
    setCategoria(searchParams.get("categoria") || "all");
    setPrecioMin(searchParams.get("precioMin") || "");
    setPrecioMax(searchParams.get("precioMax") || "");
  }, [searchParams]);

  const applyFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Resetear a página 1 al filtrar
    params.set("page", "1");

    Object.entries(newParams).forEach(([key, val]) => {
      if (val && val !== "all") {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ q: q.trim() || null });
  };

  const handleCategoryClick = (cat: string) => {
    setCategoria(cat);
    applyFilters({ categoria: cat });
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({
      precioMin: precioMin || null,
      precioMax: precioMax || null
    });
  };

  const resetAll = () => {
    setQ("");
    setCategoria("all");
    setPrecioMin("");
    setPrecioMax("");
    router.push(pathname);
  };

  const categories = [
    { id: "all", label: "Todos los Cursos" },
    { id: "web", label: "Desarrollo Web" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "ia", label: "Inteligencia Artificial" },
    { id: "seguridad", label: "Ciberseguridad" }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm mb-8 space-y-5">
      {/* Search Bar + Controls */}
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            🔍
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título, tecnología (TypeScript, AWS, Docker, Python)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
        >
          Buscar
        </button>

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2.5 text-sm font-semibold rounded-xl border transition-colors ${
            showFilters
              ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-transparent"
              : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          {showFilters ? "Ocultar Filtros ▲" : "Filtro de Precio ▼"}
        </button>
      </form>

      {/* Advanced Filters Panel (Filtros combinados de precio) */}
      {showFilters && (
        <form onSubmit={handlePriceApply} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-4 text-xs">
          <span className="font-bold text-gray-700 dark:text-gray-300">Rango de Precio ($ USD):</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
              className="w-24 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              className="w-24 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Aplicar Rango
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
          >
            Limpiar filtros
          </button>
        </form>
      )}

      {/* Categories Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100 dark:border-gray-700/60">
        {categories.map((cat) => {
          const isActive = categoria === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                isActive
                  ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                  : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
