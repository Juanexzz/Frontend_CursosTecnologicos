"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { MyInscripcionesList } from "@/features/inscripciones/components/MyInscripcionesList";

function MisInscripcionesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const isCreated = searchParams.get("created") === "true";
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/mis-inscripciones");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="space-y-4 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Banner de éxito tras crear inscripción */}
      {isCreated && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-bold text-sm">¡Inscripción registrada con éxito!</p>
              <p className="text-xs">Tu postulación ha sido guardada en la base de datos y vinculada a tu cuenta.</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Mi Portal Académico
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
          Mis inscripciones
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
    <Suspense
      fallback={
        <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="space-y-4 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <MisInscripcionesContent />
    </Suspense>
  );
}
