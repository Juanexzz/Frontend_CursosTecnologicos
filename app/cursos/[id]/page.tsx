"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCurso } from "@/features/cursos/hooks/useCurso";
import { CursoDetail } from "@/features/cursos/components/CursoDetail";
import { ErrorState } from "@/features/common/components/ErrorState";
import { Skeleton } from "@/features/common/components/Spinner";

export default function CourseDetailPage() {
  const params = useParams();
  const idOrSlug = params["id"] as string;

  const { curso, isLoading, error, refetch } = useCurso(idOrSlug);

  if (isLoading) {
    return (
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-64 rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
          <Skeleton className="h-96 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error || !curso) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4">
        <ErrorState
          title="Curso no encontrado"
          message={
            error ||
            "El curso que buscas no existe o fue retirado del catálogo."
          }
          onRetry={refetch}
          retryText="Intentar nuevamente"
        />
        <div className="mt-6 text-center">
          <Link
            href="/cursos"
            className="text-sm font-semibold text-primary hover:underline"
          >
            ← Volver al catálogo de cursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Breadcrumb accesible */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:underline">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/cursos" className="hover:underline">
          Cursos
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
          {curso.titulo}
        </span>
      </nav>

      {/* Componente de detalle modular */}
      <CursoDetail curso={curso} />
    </div>
  );
}
