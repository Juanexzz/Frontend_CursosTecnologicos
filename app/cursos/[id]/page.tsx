"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Curso } from "@/features/cursos/domain/curso.types";
import { cursoService } from "@/features/cursos/services/curso.service";

export default function CourseDetailPage() {
  const params = useParams();
  const idOrSlug = params["id"] as string;

  const [curso, setCurso] = useState<Curso | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idOrSlug) return;
    setIsLoading(true);
    cursoService
      .getCursoById(idOrSlug)
      .then((data) => setCurso(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar curso"))
      .finally(() => setIsLoading(false));
  }, [idOrSlug]);

  if (isLoading) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 animate-pulse space-y-6">
        <div className="h-10 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
      </div>
    );
  }

  if (error || !curso) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <span className="text-4xl block">🔍</span>
        <h1 className="text-2xl font-bold">Curso no encontrado</h1>
        <p className="text-sm text-gray-500">
          El programa que estás buscando no existe o fue retirado del catálogo.
        </p>
        <Link href="/cursos" className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  const avatarSrc = curso.instructorAvatar.startsWith("/") ? curso.instructorAvatar : `/${curso.instructorAvatar}`;
  const imageSrc = curso.imagen.startsWith("/") ? curso.imagen : `/${curso.imagen}`;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:underline">Inicio</Link>
        <span>/</span>
        <Link href="/cursos" className="hover:underline">Cursos</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-semibold truncate">{curso.titulo}</span>
      </nav>

      {/* Main Header & Cover */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex gap-2">
            <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
              {curso.categoriaNombre}
            </span>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
              {curso.nivel}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            {curso.titulo}
          </h1>

          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {curso.descripcionCorta}
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 pt-2">
            <span>⏱️ {curso.duracionHoras} Horas lectivas</span>
            <span>•</span>
            <span className="text-amber-500 font-bold">★ {curso.calificacion.toFixed(1)} ({curso.totalResenas} reseñas)</span>
            <span>•</span>
            <span>👥 +{curso.estudiantes} alumnos</span>
          </div>
        </div>

        {/* Card Pricing Box */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Image src={imageSrc} alt={curso.titulo} fill className="object-cover" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase font-bold text-gray-400">Inversión</span>
            <strong className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              ${curso.precio} <span className="text-sm font-normal text-gray-500">USD</span>
            </strong>
          </div>

          <Link
            href={`/inscripcion?curso=${curso.id}`}
            className="block w-full py-3.5 text-center text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            Inscribirme en este Curso
          </Link>
        </div>
      </div>

      {/* Details Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {/* Long description */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Descripción Detallada</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {curso.descripcionLarga || curso.descripcionCorta}
            </p>
          </div>

          {/* Syllabus */}
          {curso.temario && curso.temario.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Temario del Programa</h2>
              <ul className="space-y-3">
                {curso.temario.map((mod, idx) => (
                  <li key={idx} className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm flex items-start gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{mod}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {curso.requisitos && curso.requisitos.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Requisitos Previos</h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {curso.requisitos.map((req, idx) => (
                  <li key={idx}>• {req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Instructor */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider">Instructor del Curso</h3>
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500">
                <Image src={avatarSrc} alt={curso.instructorNombre} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-base">{curso.instructorNombre}</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{curso.instructorEspecialidad}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {curso.instructorBio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
