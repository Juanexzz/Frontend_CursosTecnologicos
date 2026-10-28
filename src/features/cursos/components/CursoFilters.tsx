"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "../../common/components/Button";
import { Input } from "../../common/components/Input";

const CATEGORIES = [
  { id: "all", label: "Todas las áreas" },
  { id: "web", label: "Desarrollo Web" },
  { id: "ia", label: "Inteligencia Artificial" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "seguridad", label: "Ciberseguridad" }
];

export const CursoFilters: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [categoria, setCategoria] = useState(searchParams.get("categoria") || "all");
  const [precioMin, setPrecioMin] = useState(searchParams.get("precioMin") || "");
  const [precioMax, setPrecioMax] = useState(searchParams.get("precioMax") || "");
  const [showFilters, setShowFilters] = useState(false);

  // Sincronizar desde la URL
  useEffect(() => {
    setQ(searchParams.get("q") || "");
    setCategoria(searchParams.get("categoria") || "all");
    setPrecioMin(searchParams.get("precioMin") || "");
    setPrecioMax(searchParams.get("precioMax") || "");
  }, [searchParams]);

  // Debounce en búsqueda 'q'
  useEffect(() => {
    const currentQ = searchParams.get("q") || "";
    if (q.trim() === currentQ) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      if (q.trim()) {
        params.set("q", q.trim());
      } else {
        params.delete("q");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [q, pathname, router, searchParams]);

  const applyCategory = (cat: string) => {
    setCategoria(cat);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (cat && cat !== "all") {
      params.set("categoria", cat);
    } else {
      params.delete("categoria");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (precioMin) {
      params.set("precioMin", precioMin);
    } else {
      params.delete("precioMin");
    }
    if (precioMax) {
      params.set("precioMax", precioMax);
    } else {
      params.delete("precioMax");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetAll = () => {
    setQ("");
    setCategoria("all");
    setPrecioMin("");
    setPrecioMax("");
    router.push(pathname);
  };

  const hasActiveFilters =
    Boolean(searchParams.get("q")) ||
    (Boolean(searchParams.get("categoria")) && searchParams.get("categoria") !== "all") ||
    Boolean(searchParams.get("precioMin")) ||
    Boolean(searchParams.get("precioMax"));

  return (
    <div className="bg-white dark:bg-gray-850 rounded-2xl border border-slate-200 dark:border-gray-800 p-6 shadow-sm mb-8 space-y-6">
      {/* Top search & filter toggle */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Buscar por título, tecnología, palabra clave..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <svg
            className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>{showFilters ? "Ocultar filtros" : "Filtrar por precio"}</span>
          </Button>

          {hasActiveFilters && (
            <Button type="button" variant="ghost" size="md" onClick={resetAll} className="dark:text-gray-300 dark:hover:bg-gray-800">
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {/* Categorías pill */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-gray-800">
        {CATEGORIES.map((cat) => {
          const isActive = categoria === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => applyCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-750"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Panel colapsable de precios */}
      {showFilters && (
        <form
          onSubmit={handlePriceSubmit}
          className="pt-4 border-t border-slate-100 dark:border-gray-800 flex flex-wrap items-end gap-4"
        >
          <div className="w-36">
            <Input
              type="number"
              min="0"
              label="Precio mín ($)"
              placeholder="0"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div className="w-36">
            <Input
              type="number"
              min="0"
              label="Precio máx ($)"
              placeholder="200"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <Button type="submit" size="md" variant="secondary" className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-750">
            Aplicar rango
          </Button>
        </form>
      )}
    </div>
  );
};

// Alias de compatibilidad
export const CatalogToolbar = CursoFilters;
