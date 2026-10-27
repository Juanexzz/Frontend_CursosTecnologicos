"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCursos } from "@/features/cursos/hooks/useCursos";
import { useAllInscripciones } from "@/features/inscripciones/hooks/useInscripciones";
import { AdminCourseTable } from "@/features/cursos/components/AdminCourseTable";
import { AdminInscripcionesTable } from "@/features/inscripciones/components/AdminInscripcionesTable";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"cursos" | "inscripciones">("cursos");

  const { cursos, isLoading: loadingCursos, refetch: refetchCursos } = useCursos({ limit: 50 });
  const { inscripciones, isLoading: loadingInscripciones, refetch: refetchInscripciones } = useAllInscripciones(1, 50);

  // Protección de ruta por rol
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login?redirect=/admin");
      } else if (!isAdmin) {
        router.push("/");
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  if (isLoading || !isAdmin) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 text-center">
        <p className="text-gray-500 animate-pulse text-sm">Verificando permisos de administración...</p>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Panel de Control
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            Administración NexTech
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Bienvenido, <strong>{user?.nombre}</strong> (Rol Administrador).
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("cursos")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "cursos"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            📚 Cursos ({cursos.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("inscripciones")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "inscripciones"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            📝 Inscripciones ({inscripciones.length})
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === "cursos" ? (
        loadingCursos ? (
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse" />
        ) : (
          <AdminCourseTable cursos={cursos} onRefresh={refetchCursos} />
        )
      ) : (
        loadingInscripciones ? (
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse" />
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => refetchInscripciones()}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                ↻ Refrescar datos
              </button>
            </div>
            <AdminInscripcionesTable inscripciones={inscripciones} />
          </div>
        )
      )}
    </div>
  );
}
