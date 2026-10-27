import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Curso } from "../domain/curso.types";

export interface CursoDetailProps {
  curso: Curso;
}

export const CursoDetail: React.FC<CursoDetailProps> = ({ curso }) => {
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
    <div className="space-y-12">
      {/* Hero del curso */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden relative">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-white uppercase tracking-wider">
              {curso.categoriaNombre}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-sky-400">
              Nivel: {curso.nivel}
            </span>
            <span className="text-xs text-slate-400">
              ⏱️ {curso.duracionHoras} horas de formación
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {curso.titulo}
          </h1>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            {curso.descripcionCorta}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-slate-300">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span>★</span>
              <span>{curso.calificacion.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">
                ({curso.totalResenas} reseñas)
              </span>
            </div>
            <div>👥 {curso.estudiantes} alumnos matriculados</div>
          </div>
        </div>
      </div>

      {/* Grid principal con contenido y tarjeta de compra */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contenido principal */}
        <div className="lg:col-span-2 space-y-10">
          {/* Descripción larga */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Acerca de este curso
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
              {curso.descripcionLarga}
            </div>
          </section>

          {/* Temario */}
          {curso.temario && curso.temario.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Contenido y Temario
              </h2>
              <div className="space-y-3">
                {curso.temario.map((modulo, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-slate-800 font-medium text-sm pt-1">
                      {modulo}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Requisitos y Tecnologías */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Requisitos previos
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {curso.requisitos?.map((req, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">✓</span> {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Tecnologías aplicadas
              </h3>
              <div className="flex flex-wrap gap-2">
                {curso.tecnologias?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Instructor Card */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Tu Instructor
            </h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shadow flex-shrink-0">
                <Image
                  src={avatarSrc}
                  alt={curso.instructorNombre}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {curso.instructorNombre}
                </h3>
                <p className="text-sm font-semibold text-primary">
                  {curso.instructorEspecialidad}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {curso.instructorBio}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Tarjeta lateral fija */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 space-y-6">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src={imageSrc}
                alt={curso.titulo}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400">
                  Inversión única
                </span>
                <p className="text-4xl font-black text-slate-900">
                  ${curso.precio}{" "}
                  <span className="text-sm font-medium text-slate-500">USD</span>
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Acceso vitalicio
              </span>
            </div>

            <div className="space-y-3">
              <Link
                href={`/inscripcion?cursoId=${curso.id}`}
                className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-bold text-white bg-primary hover:bg-primary-hover shadow-md transition-all text-center"
              >
                Inscribirme ahora
              </Link>
              <Link
                href="/cursos"
                className="w-full flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center"
              >
                Volver al catálogo
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span>🛡️</span> Garantía de satisfacción de 30 días
              </div>
              <div className="flex items-center gap-2">
                <span>📜</span> Certificado digital de finalización verificado
              </div>
              <div className="flex items-center gap-2">
                <span>💬</span> Acceso a la comunidad privada de Discord
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
