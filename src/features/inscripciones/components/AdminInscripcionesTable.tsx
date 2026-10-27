"use client";

import React from "react";
import { Inscripcion } from "../domain/inscripcion.types";

interface AdminInscripcionesTableProps {
  inscripciones: Inscripcion[];
}

export function AdminInscripcionesTable({ inscripciones }: AdminInscripcionesTableProps) {
  if (inscripciones.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 text-center text-sm text-gray-500">
        No hay inscripciones registradas en la plataforma aún.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Todas las Inscripciones</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Postulaciones realizadas por los estudiantes de la plataforma.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-900/60 uppercase font-bold text-gray-400 text-[10px] tracking-wider border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Estudiante</th>
              <th className="py-3 px-4">Curso Postulado</th>
              <th className="py-3 px-4">Teléfono</th>
              <th className="py-3 px-4">Nivel</th>
              <th className="py-3 px-4">Objetivo / Motivación</th>
              <th className="py-3 px-4">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {inscripciones.map((ins) => {
              const formattedDate = new Date(ins.createdAt).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "short",
                day: "numeric"
              });

              return (
                <tr key={ins.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-750/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-gray-400">#{ins.id}</td>
                  <td className="py-3 px-4">
                    <strong className="block text-gray-900 dark:text-white">{ins.user?.nombre || `Usuario #${ins.userId}`}</strong>
                    <span className="text-[11px] text-gray-400">{ins.user?.email || "Sin correo"}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-blue-600 dark:text-blue-400">
                    {ins.curso?.titulo || `Curso #${ins.cursoId}`}
                  </td>
                  <td className="py-3 px-4 font-mono">{ins.telefono}</td>
                  <td className="py-3 px-4 capitalize">{ins.nivel}</td>
                  <td className="py-3 px-4 max-w-xs truncate" title={ins.motivacion}>
                    {ins.motivacion}
                  </td>
                  <td className="py-3 px-4 text-gray-400">{formattedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
