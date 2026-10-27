"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Curso } from "../domain/curso.types";
import { cursoService } from "../services/curso.service";
import { AdminCourseModal } from "./AdminCourseModal";

interface AdminCourseTableProps {
  cursos: Curso[];
  onRefresh: () => void;
}

export function AdminCourseTable({ cursos, onRefresh }: AdminCourseTableProps) {
  const [courseToEdit, setCourseToEdit] = useState<Curso | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Curso | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenCreate = () => {
    setCourseToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (curso: Curso) => {
    setCourseToEdit(curso);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;
    setIsDeleting(true);
    try {
      await cursoService.deleteCurso(courseToDelete.id);
      setCourseToDelete(null);
      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al eliminar curso");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Gestión del Catálogo de Cursos</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Crea, actualiza y elimina especializaciones disponibles en la plataforma.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          + Agregar Nuevo Curso
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-900/60 uppercase font-bold text-gray-400 text-[10px] tracking-wider border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="py-3 px-4">Curso</th>
              <th className="py-3 px-4">Categoría</th>
              <th className="py-3 px-4">Nivel</th>
              <th className="py-3 px-4">Precio</th>
              <th className="py-3 px-4">Instructor</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {cursos.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-750/50 transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="relative w-10 h-7 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex-shrink-0">
                    <Image
                      src={c.imagen.startsWith("/") ? c.imagen : `/${c.imagen}`}
                      alt={c.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{c.titulo}</span>
                </td>
                <td className="py-3 px-4">{c.categoriaNombre}</td>
                <td className="py-3 px-4">{c.nivel}</td>
                <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">${c.precio} USD</td>
                <td className="py-3 px-4">{c.instructorNombre}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(c)}
                    className="px-2.5 py-1 text-xs font-semibold rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCourseToDelete(c)}
                    className="px-2.5 py-1 text-xs font-semibold rounded border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Crear/Editar */}
      <AdminCourseModal
        isOpen={isModalOpen}
        cursoToEdit={courseToEdit}
        onClose={() => setIsModalOpen(false)}
        onSaved={onRefresh}
      />

      {/* Modal de Confirmación antes de Eliminar (+1 pto de bonificación) */}
      {courseToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center text-xl font-bold mx-auto">
              ⚠️
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">¿Confirmas la eliminación?</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Estás a punto de eliminar permanentemente el curso <strong>&quot;{courseToDelete.titulo}&quot;</strong>. Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setCourseToDelete(null)}
                className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm"
              >
                {isDeleting ? "Eliminando..." : "Sí, Eliminar Curso"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
