"use client";

import React, { useState, useEffect } from "react";
import { Curso, CreateCursoRequest } from "../domain/curso.types";
import { cursoService } from "../services/curso.service";

interface AdminCourseModalProps {
  cursoToEdit: Curso | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function AdminCourseModal({ cursoToEdit, isOpen, onClose, onSaved }: AdminCourseModalProps) {
  const [formData, setFormData] = useState<CreateCursoRequest>({
    titulo: "",
    slug: "",
    categoria: "web",
    categoriaNombre: "Desarrollo Web",
    nivel: "Intermedio",
    duracionHoras: 40,
    precio: 60,
    calificacion: 5.0,
    totalResenas: 0,
    estudiantes: 0,
    instructorNombre: "Mateo Silvestre",
    instructorEspecialidad: "Senior Full Stack Engineer",
    instructorAvatar: "assets/img/instructor-mateo.svg",
    instructorBio: "Especialista en arquitecturas web modernas.",
    destacado: false,
    imagen: "assets/img/curso-fullstack.svg",
    tecnologias: ["TypeScript", "Node.js"],
    descripcionCorta: "",
    descripcionLarga: "",
    requisitos: ["Conocimientos básicos de programación"],
    temario: ["Módulo 1: Fundamentos", "Módulo 2: Proyecto integrador"]
  });

  const [techInput, setTechInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cursoToEdit) {
      setFormData({
        titulo: cursoToEdit.titulo,
        slug: cursoToEdit.slug,
        categoria: cursoToEdit.categoria,
        categoriaNombre: cursoToEdit.categoriaNombre,
        nivel: cursoToEdit.nivel,
        duracionHoras: cursoToEdit.duracionHoras,
        precio: cursoToEdit.precio,
        calificacion: cursoToEdit.calificacion,
        totalResenas: cursoToEdit.totalResenas,
        estudiantes: cursoToEdit.estudiantes,
        instructorNombre: cursoToEdit.instructorNombre,
        instructorEspecialidad: cursoToEdit.instructorEspecialidad,
        instructorAvatar: cursoToEdit.instructorAvatar,
        instructorBio: cursoToEdit.instructorBio,
        destacado: cursoToEdit.destacado,
        imagen: cursoToEdit.imagen,
        tecnologias: cursoToEdit.tecnologias,
        descripcionCorta: cursoToEdit.descripcionCorta,
        descripcionLarga: cursoToEdit.descripcionLarga,
        requisitos: cursoToEdit.requisitos,
        temario: cursoToEdit.temario
      });
      setTechInput(cursoToEdit.tecnologias.join(", "));
    } else {
      setFormData({
        titulo: "",
        slug: "",
        categoria: "web",
        categoriaNombre: "Desarrollo Web",
        nivel: "Intermedio",
        duracionHoras: 40,
        precio: 60,
        calificacion: 5.0,
        totalResenas: 0,
        estudiantes: 0,
        instructorNombre: "Mateo Silvestre",
        instructorEspecialidad: "Senior Full Stack Engineer",
        instructorAvatar: "assets/img/instructor-mateo.svg",
        instructorBio: "Especialista en arquitecturas web modernas.",
        destacado: false,
        imagen: "assets/img/curso-fullstack.svg",
        tecnologias: ["TypeScript", "Node.js"],
        descripcionCorta: "",
        descripcionLarga: "",
        requisitos: ["Conocimientos básicos de programación"],
        temario: ["Módulo 1: Fundamentos", "Módulo 2: Proyecto integrador"]
      });
      setTechInput("TypeScript, Node.js");
    }
  }, [cursoToEdit, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (cat: string) => {
    const mapNames: Record<string, string> = {
      web: "Desarrollo Web",
      cloud: "Cloud & DevOps",
      ia: "Inteligencia Artificial",
      seguridad: "Ciberseguridad"
    };
    setFormData((prev) => ({
      ...prev,
      categoria: cat,
      categoriaNombre: mapNames[cat] || cat
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const parsedTech = techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        tecnologias: parsedTech.length > 0 ? parsedTech : ["Tecnología General"]
      };

      if (cursoToEdit) {
        await cursoService.updateCurso(cursoToEdit.id, payload);
      } else {
        await cursoService.createCurso(payload);
      }

      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar el curso");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {cursoToEdit ? "Editar Curso" : "Crear Nuevo Curso"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm flex-1">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 rounded-lg text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Título del Curso *
            </label>
            <input
              type="text"
              required
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Categoría *
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="web">Desarrollo Web</option>
                <option value="cloud">Cloud &amp; DevOps</option>
                <option value="ia">Inteligencia Artificial</option>
                <option value="seguridad">Ciberseguridad</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Nivel *
              </label>
              <select
                value={formData.nivel}
                onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Precio (USD) *
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Duración (Horas) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.duracionHoras}
                onChange={(e) => setFormData({ ...formData, duracionHoras: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                ¿Destacado en portada?
              </label>
              <select
                value={formData.destacado ? "true" : "false"}
                onChange={(e) => setFormData({ ...formData, destacado: e.target.value === "true" })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="false">No</option>
                <option value="true">Sí (Destacado)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Tecnologías (separadas por coma) *
            </label>
            <input
              type="text"
              required
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Node.js, TypeScript, PostgreSQL"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Descripción Corta *
            </label>
            <input
              type="text"
              required
              value={formData.descripcionCorta}
              onChange={(e) => setFormData({ ...formData, descripcionCorta: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Descripción Larga *
            </label>
            <textarea
              rows={3}
              required
              value={formData.descripcionLarga}
              onChange={(e) => setFormData({ ...formData, descripcionLarga: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {isSubmitting ? "Guardando..." : "Guardar Curso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
