"use client";

import { useState, useEffect, useCallback } from "react";
import { Curso, CursoFilters, CursosPage } from "../domain/curso.types";
import { cursosService } from "../services/cursosService";

export function useCursos(params: CursoFilters = {}) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { q, categoria, precioMin, precioMax, page, limit } = params;

  const fetchCursos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: CursosPage = await cursosService.listar({
        q,
        categoria,
        precioMin,
        precioMax,
        page,
        limit
      });
      setCursos(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error inesperado al cargar los cursos"
      );
    } finally {
      setIsLoading(false);
    }
  }, [q, categoria, precioMin, precioMax, page, limit]);

  useEffect(() => {
    fetchCursos();
  }, [fetchCursos]);

  const isEmpty = !isLoading && !error && cursos.length === 0;

  return {
    cursos,
    data: cursos, // alias compatibilidad
    pagination,
    isLoading,
    isEmpty,
    error,
    refetch: fetchCursos
  };
}

export function useCurso(idOrSlug: string | number | null | undefined) {
  const [curso, setCurso] = useState<Curso | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(idOrSlug));
  const [error, setError] = useState<string | null>(null);

  const fetchCurso = useCallback(async () => {
    if (!idOrSlug) {
      setCurso(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await cursosService.obtenerPorId(idOrSlug);
      setCurso(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al obtener el detalle del curso"
      );
    } finally {
      setIsLoading(false);
    }
  }, [idOrSlug]);

  useEffect(() => {
    fetchCurso();
  }, [fetchCurso]);

  const isEmpty = !isLoading && !error && !curso;

  return {
    curso,
    isLoading,
    isEmpty,
    error,
    refetch: fetchCurso
  };
}
