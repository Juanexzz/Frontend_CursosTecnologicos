"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCursos } from "@/features/cursos/hooks/useCursos";
import { CourseCard } from "@/features/cursos/components/CourseCard";
import { CourseModal } from "@/features/cursos/components/CourseModal";
import { Curso } from "@/features/cursos/domain/curso.types";

export default function HomePage() {
  const { cursos, isLoading } = useCursos({ limit: 8 });
  const [selectedCourse, setSelectedCourse] = useState<Curso | null>(null);

  // Filtrar cursos destacados de la API
  const featuredCourses = cursos.filter((c) => c.destacado);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                🚀 Formación Tecnológica 2026
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15]">
                Impulsa tu Carrera con Habilidades en{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Tecnología Real
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Aprende Desarrollo Web, Cloud Computing, Inteligencia Artificial y Ciberseguridad con profesionales de la industria mediante proyectos prácticos y tutoría personalizada.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/cursos"
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
                >
                  Explorar Catálogo
                </Link>
                <Link
                  href="/inscripcion"
                  className="px-6 py-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-800 dark:text-gray-200 font-bold text-sm shadow-sm transition-all"
                >
                  Solicitar Asesoría
                </Link>
              </div>

              {/* Quick stats */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-3 gap-6">
                <div>
                  <strong className="block text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">
                    +10,000
                  </strong>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Egresados Activos</span>
                </div>
                <div>
                  <strong className="block text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">
                    94%
                  </strong>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Tasa de Empleabilidad</span>
                </div>
                <div>
                  <strong className="block text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">
                    4.9 / 5
                  </strong>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Calificación Media</span>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 hover:-translate-y-1 transition-transform">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-5">
                  <Image
                    src="/assets/img/curso-fullstack.svg"
                    alt="Ilustración representativa de cursos en NexTech Academy"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 mb-2">
                  Especialidad Destacada
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Ruta Full Stack &amp; Cloud 2026
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Aprende a construir y desplegar sistemas completos con arquitecturas modernas en Node.js, TypeScript y AWS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas Globales */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <strong className="text-3xl lg:text-4xl font-extrabold text-blue-600 dark:text-blue-400">8+</strong>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Especializaciones Prácticas</p>
            </div>
            <div>
              <strong className="text-3xl lg:text-4xl font-extrabold text-blue-600 dark:text-blue-400">100%</strong>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enfoque en Proyectos</p>
            </div>
            <div>
              <strong className="text-3xl lg:text-4xl font-extrabold text-blue-600 dark:text-blue-400">4</strong>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mentores Senior de la Industria</p>
            </div>
            <div>
              <strong className="text-3xl lg:text-4xl font-extrabold text-blue-600 dark:text-blue-400">24/7</strong>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Comunidad y Soporte Técnico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos Destacados */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Programas Populares
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2">
            Cursos Tecnológicos Destacados
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base">
            Planes de estudio actualizados y diseñados para responder a los estándares que buscan las empresas líderes de software.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featuredCourses.length > 0 ? featuredCourses : cursos.slice(0, 4)).map((curso) => (
              <CourseCard
                key={curso.id}
                curso={curso}
                onOpenDetail={(c) => setSelectedCourse(c)}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-sm shadow-sm transition-all"
          >
            Ver Todos los Cursos Disponibles →
          </Link>
        </div>
      </section>

      {/* Metodología */}
      <section className="py-20 bg-gray-100/70 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Por Qué Elegirnos
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2">
              Diseñado para tu Crecimiento Profesional
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base">
              Olvídate de la teoría aislada. Nuestra metodología está orientada a la creación de software real y portafolios demostrables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <span className="text-3xl mb-4 block">💻</span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Proyectos de Código Real</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Construirás soluciones reales desde la primera semana: APIs distribuidas, modelos predictivos y plataformas cloud preparadas para producción.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <span className="text-3xl mb-4 block">👨‍🏫</span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Mentores Senior en Activo</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Aprende directamente de ingenieros y especialistas que trabajan en proyectos de escala global y resuelven desafíos de arquitectura a diario.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <span className="text-3xl mb-4 block">📜</span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Certificación Reconocida</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Al finalizar con éxito tu proyecto integrador recibirás una certificación validada por nuestra red con verificación digital en LinkedIn.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
              <span className="text-3xl mb-4 block">🤝</span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Red Profesional y Comunidad</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Conéctate a una comunidad activa de desarrolladores y aprovecha las sesiones exclusivas de networking y preparación para entrevistas técnicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Historias de Éxito
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2">
            Lo Que Opinan Nuestros Egresados
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base">
            Profesionales que transformaron su perfil y hoy lideran proyectos en compañías tecnológicas de primera línea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-amber-500 text-sm">★★★★★</div>
              <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                &quot;El curso de Arquitectura Cloud con el profesor Carlos Mendoza superó todas mis expectativas. Logré entender Kubernetes a nivel de producción y en menos de dos meses conseguí empleo como DevOps Engineer.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                AM
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">Andrés Morales</h4>
                <span className="text-xs text-gray-500">DevOps Engineer en Nubiral</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-amber-500 text-sm">★★★★★</div>
              <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                &quot;La especialización en Machine Learning de la Dra. Elena Ramos es impecable. El nivel de profundidad matemática sin perder el enfoque práctico con Python me permitió publicar mi primer modelo en la empresa.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                LG
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">Laura Gómez</h4>
                <span className="text-xs text-gray-500">Data Analyst en MercadoLibre</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-amber-500 text-sm">★★★★★</div>
              <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                &quot;Viniendo de una carrera no técnica, el programa Full Stack con Mateo Silvestre me dio las bases de JavaScript y Node.js que necesitaba. Las revisiones de código individuales hicieron toda la diferencia.&quot;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                DR
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">David Rodríguez</h4>
                <span className="text-xs text-gray-500">Frontend Developer en Globant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            ¿Listo para dar el siguiente paso en tu carrera tecnológica?
          </h2>
          <p className="text-base text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Inscríbete hoy en cualquiera de nuestros programas y accede a mentoría experta, proyectos prácticos y una comunidad dispuesta a acompañar tu aprendizaje.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/inscripcion"
              className="px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-xl hover:bg-blue-50 transition-all"
            >
              Inscribirme Ahora
            </Link>
            <Link
              href="/instructores"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/30 backdrop-blur-sm transition-all"
            >
              Conocer Instructores
            </Link>
          </div>
        </div>
      </section>

      {/* Modal interactivo */}
      <CourseModal
        curso={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}
