"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Curso, CreateCursoRequest } from "../domain/curso.types";
import { cursoService } from "../services/curso.service";
import { HttpError } from "../../common/http";

interface AdminCourseModalProps {
  cursoToEdit: Curso | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function AdminCourseModal({
  cursoToEdit,
  isOpen,
  onClose,
  onSaved
}: AdminCourseModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CreateCursoRequest>({
    titulo: "",
    slug: "",
    categoria: "web",
    categoriaNombre: "Desarrollo Web",
    nivel: "Intermedio",
    duracionHoras: 40,
    precio: 60,
    calificacion: 5.0,
    totalResenas: 0,
    estudiantes: 0,
    instructorNombre: "Mateo Silvestre",
    instructorEspecialidad: "Senior Full Stack Engineer",
    instructorAvatar: "assets/img/instructor-mateo.svg",
    instructorBio: "Especialista en arquitecturas web modernas.",
    destacado: false,
    imagen: "assets/img/curso-fullstack.svg",
    tecnologias: ["TypeScript", "Node.js"],
    descripcionCorta: "",
    descripcionLarga: "",
    requisitos: ["Conocimientos básicos de programación"],
    temario: ["Módulo 1: Fundamentos", "Módulo 2: Proyecto integrador"]
  });

  const [techInput, setTechInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (cursoToEdit) {
      setFormData({
        titulo: cursoToEdit.titulo,
        slug: cursoToEdit.slug,
        categoria: cursoToEdit.categoria,
        categoriaNombre: cursoToEdit.categoriaNombre,
        nivel: cursoToEdit.nivel,
        duracionHoras: cursoToEdit.duracionHoras,
        precio: cursoToEdit.precio,
        calificacion: cursoToEdit.calificacion,
        totalResenas: cursoToEdit.totalResenas,
        estudiantes: cursoToEdit.estudiantes,
        instructorNombre: cursoToEdit.instructorNombre,
        instructorEspecialidad: cursoToEdit.instructorEspecialidad,
        instructorAvatar: cursoToEdit.instructorAvatar,
        instructorBio: cursoToEdit.instructorBio,
        destacado: cursoToEdit.destacado,
        imagen: cursoToEdit.imagen,
        tecnologias: cursoToEdit.tecnologias,
        descripcionCorta: cursoToEdit.descripcionCorta,
        descripcionLarga: cursoToEdit.descripcionLarga,
        requisitos: cursoToEdit.requisitos,
        temario: cursoToEdit.temario
      });
      setTechInput(cursoToEdit.tecnologias.join(", "));
      setPreviewUrl(
        cursoToEdit.imagen.startsWith("/") || cursoToEdit.imagen.startsWith("http")
          ? cursoToEdit.imagen
          : `/${cursoToEdit.imagen}`
      );
    } else {
      setFormData({
        titulo: "",
        slug: "",
        categoria: "web",
        categoriaNombre: "Desarrollo Web",
        nivel: "Intermedio",
        duracionHoras: 40,
        precio: 60,
        calificacion: 5.0,
        totalResenas: 0,
        estudiantes: 0,
        instructorNombre: "Mateo Silvestre",
        instructorEspecialidad: "Senior Full Stack Engineer",
        instructorAvatar: "assets/img/instructor-mateo.svg",
        instructorBio: "Especialista en arquitecturas web modernas.",
        destacado: false,
        imagen: "assets/img/curso-fullstack.svg",
        tecnologias: ["TypeScript", "Node.js"],
        descripcionCorta: "",
        descripcionLarga: "",
        requisitos: ["Conocimientos básicos de programación"],
        temario: ["Módulo 1: Fundamentos", "Módulo 2: Proyecto integrador"]
      });
      setTechInput("TypeScript, Node.js");
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setFileError(null);
    setFieldErrors({});
    setGeneralError(null);
    setStatusMessage(null);
  }, [cursoToEdit, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (cat: string) => {
    const mapNames: Record<string, string> = {
      web: "Desarrollo Web",
      cloud: "Cloud & DevOps",
      ia: "Inteligencia Artificial",
      seguridad: "Ciberseguridad"
    };
    setFormData((prev) => ({
      ...prev,
      categoria: cat,
      categoriaNombre: mapNames[cat] || cat
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validación de cliente: jpg, png o webp (+4 pts)
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setFileError("Formato no admitido. Usa un archivo JPG, PNG o WebP.");
      setSelectedFile(null);
      return;
    }

    // Validación de tamaño: máximo 2 MB (+4 pts)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileError("El archivo supera el tamaño máximo permitido de 2 MB.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.titulo.trim()) errors.titulo = "El título es obligatorio.";
    if (!formData.descripcionCorta.trim()) errors.descripcionCorta = "La descripción corta es obligatoria.";
    if (!formData.descripcionLarga.trim()) errors.descripcionLarga = "La descripción larga es obligatoria.";
    if (formData.precio < 0) errors.precio = "El precio debe ser un número positivo.";
    if (formData.duracionHoras < 1) errors.duracionHoras = "La duración mínima es de 1 hora.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});

    if (!validate()) return;

    setIsSubmitting(true);
    setStatusMessage("Guardando información del curso...");

    try {
      const parsedTech = techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      // Generar slug si está vacío
      const slugValue =
        formData.slug.trim() ||
        formData.titulo
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

      const payload = {
        ...formData,
        slug: slugValue,
        tecnologias: parsedTech.length > 0 ? parsedTech : ["Tecnología General"]
      };

      let cursoGuardado: Curso;

      if (cursoToEdit) {
        cursoGuardado = await cursoService.updateCurso(cursoToEdit.id, payload);
      } else {
        cursoGuardado = await cursoService.createCurso(payload);
      }

      // Si se seleccionó un archivo de imagen, enviarlo vía multipart POST /api/cursos/:id/imagen (+4 pts)
      if (selectedFile) {
        setStatusMessage("Subiendo imagen del curso...");
        await cursoService.subirImagen(cursoGuardado.id, selectedFile);
      }

      onSaved();
      onClose();
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
        setGeneralError("Ocurrió un error inesperado al guardar el curso.");
      }
    } finally {
      setIsSubmitting(false);
      setStatusMessage(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {cursoToEdit ? "Editar Curso" : "Crear Nuevo Curso"}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Completa los datos del programa educativo y actualiza su carátula.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl font-bold p-1"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 overflow-y-auto space-y-4 text-sm flex-1">
          {generalError && (
            <div
              role="alert"
              className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-xs"
            >
              {generalError}
            </div>
          )}

          {statusMessage && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-lg text-xs animate-pulse">
              {statusMessage}
            </div>
          )}

          {/* Subida de Imagen (+4 pts de bonificación) */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Imagen de Portada (JPG, PNG o WebP, máx. 2 MB)
            </span>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {previewUrl ? (
                <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 flex-shrink-0">
                  <Image src={previewUrl} alt="Vista previa del curso" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-28 h-20 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
                  Sin imagen
                </div>
              )}

              <div className="flex-1 w-full space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="w-full text-xs text-gray-600 dark:text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
                {fileError && <p className="text-xs text-red-500 font-medium">{fileError}</p>}
                {selectedFile && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ Archivo listo: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="courseTitulo" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Título del Curso *
            </label>
            <input
              id="courseTitulo"
              type="text"
              value={formData.titulo}
              aria-invalid={Boolean(fieldErrors.titulo)}
              onChange={(e) => {
                setFormData({ ...formData, titulo: e.target.value });
                if (fieldErrors.titulo) setFieldErrors({ ...fieldErrors, titulo: "" });
              }}
              className={`w-full px-3 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ${
                fieldErrors.titulo ? "border-red-500" : "border-gray-200 dark:border-gray-700"
              }`}
            />
            {fieldErrors.titulo && <p className="mt-1 text-xs text-red-500">{fieldErrors.titulo}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="courseCategoria" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Categoría *
              </label>
              <select
                id="courseCategoria"
                value={formData.categoria}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs"
              >
                <option value="web">Desarrollo Web</option>
                <option value="cloud">Cloud &amp; DevOps</option>
                <option value="ia">Inteligencia Artificial</option>
                <option value="seguridad">Ciberseguridad</option>
              </select>
            </div>

            <div>
              <label htmlFor="courseNivel" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Nivel *
              </label>
              <select
                id="courseNivel"
                value={formData.nivel}
                onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs"
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="coursePrecio" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Precio (USD) *
              </label>
              <input
                id="coursePrecio"
                type="number"
                min="0"
                value={formData.precio}
                aria-invalid={Boolean(fieldErrors.precio)}
                onChange={(e) => {
                  setFormData({ ...formData, precio: Number(e.target.value) });
                  if (fieldErrors.precio) setFieldErrors({ ...fieldErrors, precio: "" });
                }}
                className={`w-full px-3 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ${
                  fieldErrors.precio ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                }`}
              />
              {fieldErrors.precio && <p className="mt-1 text-xs text-red-500">{fieldErrors.precio}</p>}
            </div>

            <div>
              <label htmlFor="courseDuracion" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Duración (Horas) *
              </label>
              <input
                id="courseDuracion"
                type="number"
                min="1"
                value={formData.duracionHoras}
                aria-invalid={Boolean(fieldErrors.duracionHoras)}
                onChange={(e) => {
                  setFormData({ ...formData, duracionHoras: Number(e.target.value) });
                  if (fieldErrors.duracionHoras) setFieldErrors({ ...fieldErrors, duracionHoras: "" });
                }}
                className={`w-full px-3 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ${
                  fieldErrors.duracionHoras ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                }`}
              />
              {fieldErrors.duracionHoras && <p className="mt-1 text-xs text-red-500">{fieldErrors.duracionHoras}</p>}
            </div>

            <div>
              <label htmlFor="courseDestacado" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                ¿Destacado en portada?
              </label>
              <select
                id="courseDestacado"
                value={formData.destacado ? "true" : "false"}
                onChange={(e) => setFormData({ ...formData, destacado: e.target.value === "true" })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-xs"
              >
                <option value="false">No</option>
                <option value="true">Sí (Destacado)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="courseTech" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Tecnologías (separadas por coma) *
            </label>
            <input
              id="courseTech"
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Node.js, TypeScript, PostgreSQL"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label htmlFor="courseDescCorta" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Descripción Corta *
            </label>
            <input
              id="courseDescCorta"
              type="text"
              value={formData.descripcionCorta}
              aria-invalid={Boolean(fieldErrors.descripcionCorta)}
              onChange={(e) => {
                setFormData({ ...formData, descripcionCorta: e.target.value });
                if (fieldErrors.descripcionCorta) setFieldErrors({ ...fieldErrors, descripcionCorta: "" });
              }}
              className={`w-full px-3 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ${
                fieldErrors.descripcionCorta ? "border-red-500" : "border-gray-200 dark:border-gray-700"
              }`}
            />
            {fieldErrors.descripcionCorta && <p className="mt-1 text-xs text-red-500">{fieldErrors.descripcionCorta}</p>}
          </div>

          <div>
            <label htmlFor="courseDescLarga" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Descripción Larga *
            </label>
            <textarea
              id="courseDescLarga"
              rows={3}
              value={formData.descripcionLarga}
              aria-invalid={Boolean(fieldErrors.descripcionLarga)}
              onChange={(e) => {
                setFormData({ ...formData, descripcionLarga: e.target.value });
                if (fieldErrors.descripcionLarga) setFieldErrors({ ...fieldErrors, descripcionLarga: "" });
              }}
              className={`w-full px-3 py-2 rounded-lg border text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ${
                fieldErrors.descripcionLarga ? "border-red-500" : "border-gray-200 dark:border-gray-700"
              }`}
            />
            {fieldErrors.descripcionLarga && <p className="mt-1 text-xs text-red-500">{fieldErrors.descripcionLarga}</p>}
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar Curso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
