"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCursos } from "@/features/cursos/hooks/useCursos";
import { CatalogToolbar } from "@/features/cursos/components/CatalogToolbar";
import { CourseCard } from "@/features/cursos/components/CourseCard";
import { CourseModal } from "@/features/cursos/components/CourseModal";
import { Pagination } from "@/features/common/components/Pagination";
import { Curso } from "@/features/cursos/domain/curso.types";

function CursosCatalogContent() {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || undefined;
  const categoria = searchParams.get("categoria") || undefined;
  const precioMin = searchParams.get("precioMin") ? Number(searchParams.get("precioMin")) : undefined;
  const precioMax = searchParams.get("precioMax") ? Number(searchParams.get("precioMax")) : undefined;
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { cursos, pagination, isLoading, error } = useCursos({
    q,
    categoria,
    precioMin,
    precioMax,
    page,
    limit: 6
  });

  const [selectedCourse, setSelectedCourse] = useState<Curso | null>(null);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Formación Especializada
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2">
          Catálogo Completo de Cursos Tecnológicos
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Programas intensivos orientados a la práctica y actualizados con las tecnologías más demandadas del mercado. Filtra por categoría o busca por tecnología.
        </p>
      </div>

      {/* Toolbar con filtros y buscador */}
      <CatalogToolbar />

      {/* Status Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-6 gap-2">
        <span>
          {isLoading
            ? "Cargando cursos disponibles..."
            : `Mostrando ${cursos.length} de ${pagination.total} especializaciones disponibles`}
        </span>
        <span>Haz clic en <strong>Ver Detalle</strong> para consultar el temario y requisitos</span>
      </div>

      {/* Grid de Cursos con estados de UI */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="p-12 text-center bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-3xl text-red-600 dark:text-red-400">
          <span className="text-3xl block mb-2">⚠️</span>
          <h3 className="font-bold text-base">Error al cargar el catálogo</h3>
          <p className="text-xs mt-1">{error}</p>
        </div>
      ) : cursos.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-750 rounded-3xl space-y-4">
          <span className="text-4xl block">🔍</span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">No se encontraron cursos</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Intenta ajustar el término de búsqueda o selecciona otra categoría de especialización.
          </p>
          <a
            href="/cursos"
            className="inline-block px-5 py-2 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200"
          >
            Restablecer todos los filtros
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cursos.map((curso) => (
              <CourseCard
                key={curso.id}
                curso={curso}
                onOpenDetail={(c) => setSelectedCourse(c)}
              />
            ))}
          </div>

          <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} />
        </>
      )}

      {/* Modal accesible */}
      <CourseModal
        curso={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}

export default function CursosCatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">
          <p className="text-gray-500">Cargando catálogo...</p>
        </div>
      }
    >
      <CursosCatalogContent />
    </Suspense>
  );
}
