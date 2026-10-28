"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../auth/hooks/useAuth";
import { Curso } from "../../cursos/domain/curso.types";
import { cursoService } from "../../cursos/services/curso.service";
import { useCrearInscripcion } from "../hooks/useCrearInscripcion";
import { HttpError } from "../../common/http";

export function EnrollmentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCourse = searchParams.get("curso");
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { crearInscripcion, isLoading: isCreating } = useCrearInscripcion();

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loadingCursos, setLoadingCursos] = useState(true);

  const [formData, setFormData] = useState({
    cursoId: preselectedCourse ? Number(preselectedCourse) : 0,
    telefono: "",
    nivel: "",
    motivacion: "",
    terminos: false
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Cargar lista de cursos disponibles para el select
  useEffect(() => {
    let mounted = true;
    cursoService
      .getCursos({ limit: 50 })
      .then((res) => {
        if (mounted) {
          setCursos(res.data);
          if (preselectedCourse) {
            const found = res.data.find(
              (c) => c.id === Number(preselectedCourse) || c.slug === preselectedCourse
            );
            if (found) {
              setFormData((prev) => ({ ...prev, cursoId: found.id }));
            }
          }
        }
      })
      .catch((err) => console.error("Error al cargar cursos para formulario:", err))
      .finally(() => {
        if (mounted) setLoadingCursos(false);
      });

    return () => {
      mounted = false;
    };
  }, [preselectedCourse]);

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.cursoId || formData.cursoId <= 0) {
      errors.cursoId = "Debes seleccionar un curso de la lista.";
    }

    if (!formData.telefono.trim()) {
      errors.telefono = "El número telefónico o WhatsApp es obligatorio.";
    } else {
      const cleanPhone = formData.telefono.replace(/[\s+-]/g, "");
      if (cleanPhone.length < 7 || cleanPhone.length > 15 || isNaN(Number(cleanPhone))) {
        errors.telefono = "Ingresa un número telefónico válido (entre 7 y 15 dígitos numéricos).";
      }
    }

    if (!formData.nivel) {
      errors.nivel = "Indica tu nivel actual de conocimientos.";
    }

    if (!formData.motivacion.trim()) {
      errors.motivacion = "Por favor cuéntanos brevemente tu objetivo profesional.";
    } else if (formData.motivacion.trim().length < 15) {
      errors.motivacion = "El mensaje debe tener al menos 15 caracteres para brindarte mejor asesoría.";
    }

    if (!formData.terminos) {
      errors.terminos = "Debes aceptar los términos y la política de tratamiento de datos para continuar.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }

    if (!validate()) return;

    try {
      await crearInscripcion({
        cursoId: formData.cursoId,
        telefono: formData.telefono.trim(),
        nivel: formData.nivel,
        motivacion: formData.motivacion.trim()
      });

      // Redirigir a /mis-inscripciones con estado de éxito según paso 3 de F4
      router.push("/mis-inscripciones?created=true");
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.errors && err.errors.length > 0) {
          const mapped: Record<string, string> = {};
          err.errors.forEach((e) => {
            mapped[e.field] = e.message;
          });
          setFieldErrors(mapped);
        } else {
          setGeneralError(err.message);
        }
      } else {
        setGeneralError("Ocurrió un error inesperado al procesar la inscripción.");
      }
    }
  };

  if (authLoading) {
    return (
      <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 animate-pulse">
        <p className="text-gray-500">Cargando formulario...</p>
      </div>
    );
  }

  // Si no hay sesión, se muestra el aviso y enlace a login en lugar del formulario
  if (!isAuthenticated) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-3xl mx-auto">
          🔐
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Inicia sesión para postularte
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Para registrar tu inscripción y vincularla a tu historial académico necesitas contar con una cuenta activa en NexTech Academy.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href={`/login?redirect=${encodeURIComponent(`/inscripcion${preselectedCourse ? `?curso=${preselectedCourse}` : ""}`)}`}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/registro"
            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm transition-all"
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Postulación al Programa</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Ingresa tus datos verídicos para ponernos en contacto contigo.
        </p>
      </div>

      {/* Error general */}
      {generalError && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm"
        >
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Datos de Usuario Autenticado */}
        {user && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-750 border border-gray-100 dark:border-gray-700 text-xs">
            <div>
              <span className="text-gray-400 block uppercase font-bold">Aspirante:</span>
              <strong className="text-gray-900 dark:text-white text-sm">{user.nombre}</strong>
            </div>
            <div>
              <span className="text-gray-400 block uppercase font-bold">Correo de contacto:</span>
              <strong className="text-gray-900 dark:text-white text-sm">{user.email}</strong>
            </div>
          </div>
        )}

        {/* Fila: Teléfono y Curso */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Teléfono / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              aria-invalid={Boolean(fieldErrors.telefono)}
              aria-describedby={fieldErrors.telefono ? "telefono-error" : undefined}
              onChange={(e) => {
                setFormData({ ...formData, telefono: e.target.value });
                if (fieldErrors.telefono) setFieldErrors({ ...fieldErrors, telefono: "" });
              }}
              placeholder="+57 300 123 4567"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                fieldErrors.telefono
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-200 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-100"
              }`}
            />
            {fieldErrors.telefono && (
              <p id="telefono-error" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{fieldErrors.telefono}</p>
            )}
          </div>

          <div>
            <label htmlFor="cursoSelect" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Curso de Interés <span className="text-red-500">*</span>
            </label>
            <select
              id="cursoSelect"
              name="cursoId"
              value={formData.cursoId || ""}
              disabled={loadingCursos}
              aria-invalid={Boolean(fieldErrors.cursoId)}
              aria-describedby={fieldErrors.cursoId ? "curso-error" : undefined}
              onChange={(e) => {
                setFormData({ ...formData, cursoId: Number(e.target.value) });
                if (fieldErrors.cursoId) setFieldErrors({ ...fieldErrors, cursoId: "" });
              }}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                fieldErrors.cursoId
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-200 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-100"
              }`}
            >
              <option value="">
                {loadingCursos ? "Cargando catálogo..." : "-- Selecciona el curso de tu interés --"}
              </option>
              {cursos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.titulo} (${c.precio} USD)
                </option>
              ))}
            </select>
            {fieldErrors.cursoId && (
              <p id="curso-error" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{fieldErrors.cursoId}</p>
            )}
          </div>
        </div>

        {/* Nivel Actual */}
        <div>
          <label htmlFor="nivelExperiencia" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Nivel Actual de Conocimientos <span className="text-red-500">*</span>
          </label>
          <select
            id="nivelExperiencia"
            name="nivel"
            value={formData.nivel}
            aria-invalid={Boolean(fieldErrors.nivel)}
            aria-describedby={fieldErrors.nivel ? "nivel-error" : undefined}
            onChange={(e) => {
              setFormData({ ...formData, nivel: e.target.value });
              if (fieldErrors.nivel) setFieldErrors({ ...fieldErrors, nivel: "" });
            }}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
              fieldErrors.nivel
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-200 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-100"
            }`}
          >
            <option value="">-- Selecciona tu nivel técnico --</option>
            <option value="principiante">Principiante (Desde cero, sin bases de código)</option>
            <option value="intermedio">Intermedio (Sé programar o uso Git, busco especializarme)</option>
            <option value="avanzado">Avanzado (Trabajo en el sector TI y quiero ascender)</option>
          </select>
          {fieldErrors.nivel && (
            <p id="nivel-error" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{fieldErrors.nivel}</p>
          )}
        </div>

        {/* Motivación */}
        <div>
          <label htmlFor="motivacion" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            ¿Cuál es tu principal objetivo profesional? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="motivacion"
            name="motivacion"
            rows={4}
            value={formData.motivacion}
            aria-invalid={Boolean(fieldErrors.motivacion)}
            aria-describedby={fieldErrors.motivacion ? "motivacion-error" : undefined}
            onChange={(e) => {
              setFormData({ ...formData, motivacion: e.target.value });
              if (fieldErrors.motivacion) setFieldErrors({ ...fieldErrors, motivacion: "" });
            }}
            placeholder="Cuéntanos qué esperas lograr con este curso o qué tipo de puesto buscas..."
            className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
              fieldErrors.motivacion
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-200 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-100"
            }`}
          />
          {fieldErrors.motivacion && (
            <p id="motivacion-error" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{fieldErrors.motivacion}</p>
          )}
        </div>

        {/* Términos */}
        <div>
          <div className="flex items-start gap-3">
            <input
              id="terminos"
              name="terminos"
              type="checkbox"
              checked={formData.terminos}
              aria-invalid={Boolean(fieldErrors.terminos)}
              aria-describedby={fieldErrors.terminos ? "terminos-error" : undefined}
              onChange={(e) => {
                setFormData({ ...formData, terminos: e.target.checked });
                if (fieldErrors.terminos) setFieldErrors({ ...fieldErrors, terminos: "" });
              }}
              className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="terminos" className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              He leído y acepto los términos de servicio y la política de tratamiento de datos personales de NexTech Academy.
            </label>
          </div>
          {fieldErrors.terminos && (
            <p id="terminos-error" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{fieldErrors.terminos}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isCreating}
          className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? "Enviando solicitud..." : "Enviar Solicitud de Inscripción"}
        </button>
      </form>
    </div>
  );
}
