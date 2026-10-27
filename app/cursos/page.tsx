"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCursos } from "@/features/cursos/hooks/useCursos";
import { CursoFilters } from "@/features/cursos/components/CursoFilters";
import { CursoGrid } from "@/features/cursos/components/CursoGrid";
import { CourseModal } from "@/features/cursos/components/CourseModal";
import { Pagination } from "@/features/common/components/Pagination";
import { EmptyState } from "@/features/common/components/EmptyState";
import { ErrorState } from "@/features/common/components/ErrorState";
import { Spinner } from "@/features/common/components/Spinner";
import { Curso } from "@/features/cursos/domain/curso.types";

function CursosCatalogContent() {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || undefined;
  const categoria = searchParams.get("categoria") || undefined;
  const precioMin = searchParams.get("precioMin")
    ? Number(searchParams.get("precioMin"))
    : undefined;
  const precioMax = searchParams.get("precioMax")
    ? Number(searchParams.get("precioMax"))
    : undefined;
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { cursos, pagination, isLoading, isEmpty, error, refetch } = useCursos({
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
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Formación Especializada
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
          Catálogo Completo de Cursos Tecnológicos
        </h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">
          Programas intensivos orientados a la práctica con las tecnologías más
          demandadas de la industria. Filtra por categoría o busca por tecnología.
        </p>
      </div>

      {/* Toolbar con buscador y filtros URL */}
      <CursoFilters />

      {/* Barra de estado */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 mb-6 gap-2">
        <span>
          {isLoading
            ? "Cargando cursos disponibles desde la API..."
            : `Mostrando ${cursos.length} de ${pagination.total} especializaciones disponibles`}
        </span>
        <span>Haz clic en un curso para consultar el temario y requisitos completos</span>
      </div>

      {/* Grid de Cursos con estados de UI diseñados */}
      {isLoading ? (
        <CursoGrid cursos={[]} isLoading={true} skeletonCount={6} />
      ) : error ? (
        <ErrorState
          title="Error al cargar el catálogo de cursos"
          message={error}
          onRetry={refetch}
          retryText="Reintentar conexión"
        />
      ) : isEmpty ? (
        <EmptyState
          title="No se encontraron cursos con estos criterios"
          description="Intenta ajustar tus filtros de búsqueda o rango de precios para ver más cursos."
          actionText="Limpiar filtros"
          onAction={() => {
            window.location.href = "/cursos";
          }}
        />
      ) : (
        <CursoGrid
          cursos={cursos}
          isLoading={false}
          onOpenDetail={(curso) => setSelectedCourse(curso)}
        />
      )}

      {/* Paginación por URL */}
      {!isLoading && !error && pagination.totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
          />
        </div>
      )}

      {/* Modal interactivo de previsualización rápida */}
      {selectedCourse && (
        <CourseModal
          curso={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}

export default function CursosPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <CursosCatalogContent />
    </Suspense>
  );
}
