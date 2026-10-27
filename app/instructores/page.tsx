import React from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Cuerpo Docente y Mentores | NexTech Academy",
  description: "Conoce al cuerpo docente y mentores de NexTech Academy. Profesionales senior en activo en las principales áreas tecnológicas."
};

const INSTRUCTORES = [
  {
    id: "inst-1",
    nombre: "Ing. Carlos Mendoza",
    especialidad: "Cloud Solutions Architect & DevOps Lead",
    biografia: "Más de 12 años diseñando infraestructuras distribuidas y de alta disponibilidad en AWS y GCP. Ex-Tech Lead en empresas Fintech de escala regional.",
    avatar: "/assets/img/instructor-carlos.svg",
    rating: "4.9",
    alumnos: "+3,400",
    experiencia: "12 años exp.",
    cursos: [
      { titulo: "Arquitectura Cloud con AWS y Kubernetes", href: "/cursos" },
      { titulo: "Automatización DevOps: CI/CD con GitHub Actions", href: "/cursos" }
    ]
  },
  {
    id: "inst-2",
    nombre: "Dra. Elena Ramos",
    especialidad: "Ph.D. en IA & Lead Data Scientist",
    biografia: "Doctora en Ciencias de la Computación e investigadora en redes neuronales profundas y LLMs. Más de una década liderando proyectos de Machine Learning.",
    avatar: "/assets/img/instructor-elena.svg",
    rating: "5.0",
    alumnos: "+4,100",
    experiencia: "10 años exp.",
    cursos: [
      { titulo: "Machine Learning y Ciencia de Datos con Python", href: "/cursos" },
      { titulo: "Deep Learning y Modelos Generativos (LLMs)", href: "/cursos" }
    ]
  },
  {
    id: "inst-3",
    nombre: "Mateo Silvestre",
    especialidad: "Senior Full Stack Engineer & Mentor",
    biografia: "Especialista en arquitecturas modernas con TypeScript, microservicios y frontend accesible. Contribuidor activo en librerías open-source.",
    avatar: "/assets/img/instructor-mateo.svg",
    rating: "4.8",
    alumnos: "+2,800",
    experiencia: "8 años exp.",
    cursos: [
      { titulo: "Desarrollo Full Stack Moderno con Node.js & TS", href: "/cursos" },
      { titulo: "Fundamentos de Desarrollo Frontend HTML5 & CSS3", href: "/cursos" }
    ]
  },
  {
    id: "inst-4",
    nombre: "Sofía Valenzuela",
    especialidad: "Lead Security Analyst & Ethical Hacker",
    biografia: "Consultora senior de seguridad informática con certificaciones CISSP y OSCP. Especialista en pruebas de penetración y protección de infraestructuras críticas.",
    avatar: "/assets/img/instructor-sofia.svg",
    rating: "4.9",
    alumnos: "+3,100",
    experiencia: "9 años exp.",
    cursos: [
      { titulo: "Ciberseguridad Defensiva y Hacking Ético", href: "/cursos" },
      { titulo: "Auditoría de Seguridad y Gestión de Vulnerabilidades", href: "/cursos" }
    ]
  }
];

export default function InstructoresPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Mentoría de Alto Nivel
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2">
          Aprende con Líderes de la Industria
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Nuestros instructores no son solo académicos: son ingenieros senior, arquitectos de software e investigadores activos en empresas globales de tecnología.
        </p>
      </div>

      {/* Grid de Instructores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {INSTRUCTORES.map((inst) => (
          <article
            key={inst.id}
            className="p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center flex flex-col items-center"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-md mb-5">
              <Image src={inst.avatar} alt={inst.nombre} fill className="object-cover" />
            </div>

            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{inst.nombre}</h2>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4 block">
              {inst.especialidad}
            </span>

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-1">
              {inst.biografia}
            </p>

            <div className="flex flex-wrap justify-center gap-1.5 mb-6 text-[11px] font-bold text-gray-700 dark:text-gray-300">
              <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700">⭐ {inst.rating}</span>
              <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700">👥 {inst.alumnos}</span>
              <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700">💼 {inst.experiencia}</span>
            </div>

            <div className="w-full text-left pt-4 border-t border-gray-100 dark:border-gray-700 text-xs mt-auto">
              <span className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Cursos que imparte</span>
              <ul className="space-y-1">
                {inst.cursos.map((c, i) => (
                  <li key={i}>
                    <Link href={c.href} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1">
                      • {c.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Banner de Mentoría */}
      <div className="p-10 rounded-3xl bg-gray-100/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          ¿Deseas una sesión de orientación con un mentor?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
          Si no estás seguro de qué ruta tecnológica se adapta mejor a tu perfil y objetivos, nuestros mentores pueden asesorarte sin ningún costo de admisión.
        </p>
        <div>
          <Link
            href="/inscripcion"
            className="inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
          >
            Solicitar Orientación Gratuita
          </Link>
        </div>
      </div>
    </div>
  );
}
