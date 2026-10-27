"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMyInscripciones } from "../hooks/useInscripciones";
import { Pagination } from "../../common/components/Pagination";

interface MyInscripcionesListProps {
  page: number;
}

export function MyInscripcionesList({ page }: MyInscripcionesListProps) {
  const { inscripciones, pagination, isLoading, error } = useMyInscripciones(page, 6);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  if (inscripciones.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl space-y-4">
        <span className="text-4xl">📚</span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Aún no tienes inscripciones</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Explora nuestro catálogo de especializaciones y postúlate al curso que impulsará tu carrera.
        </p>
        <div>
          <Link
            href="/cursos"
            className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-all"
          >
            Explorar Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {inscripciones.map((ins) => {
        const curso = ins.curso;
        const formattedDate = new Date(ins.createdAt).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });

        return (
          <div
            key={ins.id}
            className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              {curso && (
                <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 flex-shrink-0">
                  <Image
                    src={curso.imagen.startsWith("/") ? curso.imagen : `/${curso.imagen}`}
                    alt={curso.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {curso?.categoriaNombre || "Especialidad"}
                </span>
                <h4 className="font-bold text-base text-gray-900 dark:text-white">
                  {curso?.titulo || `Curso #${ins.cursoId}`}
                </h4>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>📅 Inscrito el {formattedDate}</span>
                  <span>•</span>
                  <span>Nivel: <strong className="capitalize">{ins.nivel}</strong></span>
                  <span>•</span>
                  <span>WhatsApp: {ins.telefono}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-700">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                Confirmada
              </span>
              {curso && (
                <Link
                  href={`/cursos/${curso.slug || curso.id}`}
                  className="px-3.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-750 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Ver Programa
                </Link>
              )}
            </div>
          </div>
        );
      })}

      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} />
    </div>
  );
}
