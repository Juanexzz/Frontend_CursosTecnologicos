"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Curso } from "../domain/curso.types";

interface CourseModalProps {
  curso: Curso | null;
  onClose: () => void;
}

export function CourseModal({ curso, onClose }: CourseModalProps) {
  useEffect(() => {
    if (!curso) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [curso, onClose]);

  if (!curso) return null;

  const avatarSrc = curso.instructorAvatar.startsWith("/")
    ? curso.instructorAvatar
    : `/${curso.instructorAvatar}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {curso.categoriaNombre} • {curso.nivel}
            </span>
            <h2 id="modal-title" className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">
              {curso.titulo}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana emergente"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-600 dark:text-gray-300">
          {/* Stats pills */}
          <div className="flex flex-wrap gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 text-xs">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              ⏱️ {curso.duracionHoras} Horas de formación práctica
            </span>
            <span className="font-semibold text-amber-500">
              ★ {curso.calificacion.toFixed(1)} ({curso.totalResenas} reseñas de estudiantes)
            </span>
            <span className="text-gray-500">
              👥 {curso.estudiantes} graduados
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
              Descripción del Programa
            </h3>
            <p className="leading-relaxed">
              {curso.descripcionLarga || curso.descripcionCorta}
            </p>
          </div>

          {/* Technologies */}
          {curso.tecnologias && curso.tecnologias.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Stack &amp; Tecnologías
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {curso.tecnologias.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Syllabus */}
          {curso.temario && curso.temario.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Estructura del Temario
              </h3>
              <ul className="space-y-1.5">
                {curso.temario.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {curso.requisitos && curso.requisitos.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Requisitos Previos
              </h3>
              <ul className="space-y-1 text-gray-500 dark:text-gray-400">
                {curso.requisitos.map((req, idx) => (
                  <li key={idx}>• {req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructor Box */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Docente a Cargo
            </span>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-blue-500">
                <Image
                  src={avatarSrc}
                  alt={curso.instructorNombre}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{curso.instructorNombre}</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{curso.instructorEspecialidad}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {curso.instructorBio}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 flex items-center justify-between">
          <div>
            <span className="block text-[10px] uppercase font-bold text-gray-400">Inversión del programa</span>
            <strong className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              ${curso.precio} <span className="text-xs font-normal">USD</span>
            </strong>
          </div>

          <Link
            href={`/inscripcion?curso=${curso.id}`}
            onClick={onClose}
            className="px-6 py-3 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            Inscribirme en este Curso
          </Link>
        </div>
      </div>
    </div>
  );
}
