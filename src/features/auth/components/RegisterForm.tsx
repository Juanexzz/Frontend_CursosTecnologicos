"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { HttpError } from "../../common/http";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      errors.nombre = "El nombre completo es obligatorio.";
    } else if (formData.nombre.trim().length < 3) {
      errors.nombre = "El nombre debe contener al menos 3 caracteres.";
    }

    if (!formData.email.trim()) {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Ingresa un formato de correo electrónico válido.";
    }

    if (!formData.password) {
      errors.password = "La contraseña es obligatoria.";
    } else if (formData.password.length < 6) {
      errors.password = "La contraseña debe contener al menos 6 caracteres.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
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
      await register({
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        password: formData.password
      });
      router.push("/");
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
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Crear Cuenta</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Únete a NexTech Academy y accede a cursos especializados
        </p>
      </div>

      {generalError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Nombre Completo <span className="text-red-500">*</span>
          </label>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            value={formData.nombre}
            onChange={(e) => {
              setFormData({ ...formData, nombre: e.target.value });
              if (fieldErrors.nombre) setFieldErrors({ ...fieldErrors, nombre: "" });
            }}
            placeholder="Ej. Juan Esteban Vallejo"
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
              fieldErrors.nombre
                ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                : "border-gray-200 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-100 dark:focus:ring-blue-900"
            }`}
          />
          {fieldErrors.nombre && (
            <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{fieldErrors.nombre}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
            }}
            placeholder="tu@correo.com"
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
              fieldErrors.email
                ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                : "border-gray-200 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-100 dark:focus:ring-blue-900"
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Contraseña <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" });
            }}
            placeholder="Mínimo 6 caracteres"
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
              fieldErrors.password
                ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                : "border-gray-200 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-100 dark:focus:ring-blue-900"
            }`}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{fieldErrors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Confirmar Contraseña <span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: "" });
            }}
            placeholder="Repite tu contraseña"
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
              fieldErrors.confirmPassword
                ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                : "border-gray-200 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-100 dark:focus:ring-blue-900"
            }`}
          />
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2"
        >
          {isSubmitting ? "Creando cuenta..." : "Registrarme"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}
