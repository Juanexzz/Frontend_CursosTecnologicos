"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold text-gray-900 dark:text-white">
              <Image
                src="/assets/img/logo.svg"
                alt="Logo NexTech"
                width={34}
                height={34}
              />
              <span>
                Nex<span className="text-blue-600">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              Academia especializada en la formación práctica de ingenieros de software, analistas de datos, arquitectos cloud y especialistas en ciberseguridad.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Catálogo de Cursos
                </Link>
              </li>
              <li>
                <Link href="/instructores" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cuerpo Docente
                </Link>
              </li>
              <li>
                <Link href="/inscripcion" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Inscripción y Precios
                </Link>
              </li>
            </ul>
          </div>

          {/* Áreas TI */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Áreas TI
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/cursos?categoria=web" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link href="/cursos?categoria=cloud" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cloud &amp; DevOps
                </Link>
              </li>
              <li>
                <Link href="/cursos?categoria=ia" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Inteligencia Artificial
                </Link>
              </li>
              <li>
                <Link href="/cursos?categoria=seguridad" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Ciberseguridad
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Boletín Tecnológico
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Recibe tutoriales semanales, recursos open-source y avisos de nuevas convocatorias académicas.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("¡Gracias por suscribirte al boletín de NexTech!");
                (e.currentTarget as HTMLFormElement).reset();
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="tu@correo.com"
                required
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Unirme
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>© 2026 NexTech Academy. Desarrollado por Juan Esteban Vallejo. Todos los derechos reservados.</p>
          <p>Desarrollado con Next.js (App Router), TypeScript y Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
