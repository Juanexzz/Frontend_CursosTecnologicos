"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../../auth/hooks/useAuth";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") ||
      localStorage.getItem("nextech_theme") === "dark";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("nextech_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("nextech_theme", "light");
    }
  };

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Cursos", href: "/cursos" },
    { label: "Instructores", href: "/instructores" },
    { label: "Inscripción", href: "/inscripcion" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
          <Image
            src="/assets/img/logo.svg"
            alt="Logotipo NexTech"
            width={38}
            height={38}
            priority
          />
          <span>
            Nex<span className="text-blue-600">Tech</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors py-1 relative ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </Link>
            );
          })}

          {isAuthenticated && (
            <Link
              href="/mis-inscripciones"
              className={`text-sm font-semibold transition-colors py-1 relative ${
                pathname === "/mis-inscripciones"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Mis Inscripciones
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin"
              className={`text-sm font-semibold px-3 py-1 rounded-full border border-purple-500/30 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/40 ${
                pathname.startsWith("/admin") ? "ring-2 ring-purple-500" : ""
              }`}
            >
              🛡️ Administración
            </Link>
          )}
        </nav>

        {/* Actions & Session */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="5" strokeWidth="2" />
                <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2" strokeLinecap="round" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2" strokeLinecap="round" />
                <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" strokeLinecap="round" />
                <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" strokeLinecap="round" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2" strokeLinecap="round" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* Sesión: Invitado vs Usuario */}
          {isAuthenticated && user ? (
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Hola, <strong className="text-gray-900 dark:text-white">{user.nombre.split(" ")[0]}</strong>
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-xs font-semibold py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-semibold py-2 px-3.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Ingresar
              </Link>
              <Link
                href="/registro"
                className="text-xs font-semibold py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
              >
                Registrarme
              </Link>
            </div>
          )}

          {/* Botón Móvil */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg flex flex-col justify-center items-center gap-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            aria-label="Menú de navegación"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`w-5 h-0.5 bg-gray-900 dark:bg-white transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-gray-900 dark:bg-white transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-gray-900 dark:bg-white transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-1.5 ${
                  pathname === link.href ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                href="/mis-inscripciones"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold py-1.5 text-gray-700 dark:text-gray-300"
              >
                Mis Inscripciones
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold py-1.5 text-purple-600 dark:text-purple-400"
              >
                🛡️ Panel de Administración
              </Link>
            )}
          </nav>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3">
            {isAuthenticated && user ? (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sesión iniciada como <strong>{user.nombre}</strong> ({user.email})
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-lg"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                >
                  Ingresar
                </Link>
                <Link
                  href="/registro"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center text-sm font-semibold rounded-lg bg-blue-600 text-white"
                >
                  Registrarme
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
