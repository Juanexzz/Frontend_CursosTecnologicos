"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10" aria-label="Paginación de resultados">
      {/* Botón Anterior */}
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="px-3.5 py-2 text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        >
          ← Anterior
        </Link>
      ) : (
        <span className="px-3.5 py-2 text-sm font-semibold rounded-lg border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed">
          ← Anterior
        </span>
      )}

      {/* Números de Página */}
      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isCurrent = p === currentPage;
          return (
            <Link
              key={p}
              href={createPageURL(p)}
              className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-lg transition-colors ${
                isCurrent
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-current={isCurrent ? "page" : undefined}
            >
              {p}
            </Link>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="px-3.5 py-2 text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        >
          Siguiente →
        </Link>
      ) : (
        <span className="px-3.5 py-2 text-sm font-semibold rounded-lg border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed">
          Siguiente →
        </span>
      )}
    </nav>
  );
}
