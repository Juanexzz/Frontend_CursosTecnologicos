import React from "react";
import Image from "next/image";
import { Curso } from "../domain/curso.types";

interface CourseCardProps {
  curso: Curso;
  onOpenDetail?: (curso: Curso) => void;
}

export function CourseCard({ curso, onOpenDetail }: CourseCardProps) {
  // Asegurar ruta de imagen
  const imageSrc = curso.imagen.startsWith("/")
    ? curso.imagen
    : `/${curso.imagen}`;

  const avatarSrc = curso.instructorAvatar.startsWith("/")
    ? curso.instructorAvatar
    : `/${curso.instructorAvatar}`;

  return (
    <article className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <Image
          src={imageSrc}
          alt={`Portada de ${curso.titulo}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-900/80 backdrop-blur-md text-white">
          {curso.categoriaNombre}
        </span>
        <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-gray-900/80 backdrop-blur-md text-sky-400">
          {curso.nivel}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2.5">
          <span>⏱️ {curso.duracionHoras} horas</span>
          <div className="flex items-center gap-1 font-bold text-amber-500">
            <span>★</span>
            <span>{curso.calificacion.toFixed(1)}</span>
            <span className="text-gray-400 font-normal">({curso.totalResenas})</span>
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {curso.titulo}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-6 flex-1">
          {curso.descripcionCorta}
        </p>

        {/* Instructor */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center gap-3 mt-auto">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-blue-500">
            <Image
              src={avatarSrc}
              alt={curso.instructorNombre}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-gray-900 dark:text-white">{curso.instructorNombre}</h4>
            <span className="text-gray-500 dark:text-gray-400 line-clamp-1">{curso.instructorEspecialidad}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/60 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
        <div>
          <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Inversión</span>
          <strong className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            ${curso.precio} <span className="text-xs font-normal">USD</span>
          </strong>
        </div>

        {onOpenDetail ? (
          <button
            type="button"
            onClick={() => onOpenDetail(curso)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all"
          >
            Ver Detalle
          </button>
        ) : (
          <a
            href={`/cursos/${curso.slug || curso.id}`}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all"
          >
            Ver Detalle
          </a>
        )}
      </div>
    </article>
  );
}
