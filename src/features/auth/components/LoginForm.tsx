"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { HttpError } from "../../common/http";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.email.trim()) {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Ingresa un formato de correo electrónico válido.";
    }

    if (!formData.password) {
      errors.password = "La contraseña es obligatoria.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await login({
        email: formData.email.trim(),
        password: formData.password
      });
      router.push(redirectUrl);
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
        setGeneralError("Ocurrió un error inesperado al conectar con el servidor.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Iniciar Sesión</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Accede a tu cuenta en NexTech Academy
        </p>
      </div>

      {generalError && (
        <div
          role="alert"
          className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg"
        >
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
            }}
            placeholder="tu@correo.com"
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
              fieldErrors.email
                ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                : "border-gray-200 dark:border-gray-600 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500"
            }`}
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-500 dark:text-red-400">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Contraseña <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" });
            }}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
              fieldErrors.password
                ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                : "border-gray-200 dark:border-gray-600 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500"
            }`}
          />
          {fieldErrors.password && (
            <p id="password-error" className="mt-1 text-xs text-red-500 dark:text-red-400">
              {fieldErrors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-lg text-sm shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Iniciando sesión..." : "Ingresar"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        ¿Aún no tienes cuenta?{" "}
        <Link href="/registro" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          Regístrate gratis
        </Link>
      </div>
    </div>
  );
}
