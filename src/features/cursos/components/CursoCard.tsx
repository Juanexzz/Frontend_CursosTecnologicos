import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Curso } from "../domain/curso.types";

export interface CursoCardProps {
  curso: Curso;
  onOpenDetail?: (curso: Curso) => void;
}

export const CursoCard: React.FC<CursoCardProps> = ({ curso, onOpenDetail }) => {
  // Manejo de ruta de imagen estática vs URL externa
  const imageSrc = curso.imagen.startsWith("http")
    ? curso.imagen
    : curso.imagen.startsWith("/")
    ? curso.imagen
    : `/assets/img/${curso.imagen}`;

  const avatarSrc = curso.instructorAvatar.startsWith("http")
    ? curso.instructorAvatar
    : curso.instructorAvatar.startsWith("/")
    ? curso.instructorAvatar
    : `/assets/img/${curso.instructorAvatar}`;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
        <Image
          src={imageSrc}
          alt={`Portada de ${curso.titulo}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white">
          {curso.categoriaNombre}
        </span>
        <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-sky-400">
          {curso.nivel}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
          <span>⏱️ {curso.duracionHoras} horas</span>
          <div className="flex items-center gap-1 font-bold text-amber-500">
            <span>★</span>
            <span>{curso.calificacion.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({curso.totalResenas})</span>
          </div>
        </div>

        <h3 className="font-bold text-lg text-slate-900 leading-snug mb-2 group-hover:text-primary transition-colors">
          <Link href={`/cursos/${curso.id}`}>
            {curso.titulo}
          </Link>
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 flex-1">
          {curso.descripcionCorta}
        </p>

        {/* Instructor */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-3 mt-auto">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
            <Image
              src={avatarSrc}
              alt={curso.instructorNombre}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">
              {curso.instructorNombre}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {curso.instructorEspecialidad}
            </p>
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Precio</span>
            <span className="text-xl font-black text-slate-900">
              ${curso.precio} <span className="text-xs font-normal text-slate-500">USD</span>
            </span>
          </div>
          <div className="flex gap-2">
            {onOpenDetail ? (
              <button
                type="button"
                onClick={() => onOpenDetail(curso)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Vista previa
              </button>
            ) : null}
            <Link
              href={`/cursos/${curso.id}`}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary-hover shadow-sm transition-colors"
            >
              Ver curso
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

// Alias de compatibilidad
export const CourseCard = CursoCard;
