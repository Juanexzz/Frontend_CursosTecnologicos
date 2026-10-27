"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { MyInscripcionesList } from "@/features/inscripciones/components/MyInscripcionesList";

function MisInscripcionesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/mis-inscripciones");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 text-center">
        <p className="text-gray-500 animate-pulse text-sm">Verificando sesión...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Mi Portal Académico
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
          Mis Inscripciones y Programas
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Historial de cursos a los que te has postulado, <strong>{user?.nombre}</strong>.
        </p>
      </div>

      <MyInscripcionesList page={page} />
    </div>
  );
}

export default function MisInscripcionesPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">Cargando...</div>}>
      <MisInscripcionesContent />
    </Suspense>
  );
}
