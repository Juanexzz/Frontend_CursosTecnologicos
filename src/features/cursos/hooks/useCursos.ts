"use client";

import { useState, useEffect, useCallback } from "react";
import { Curso, CursoFilterParams, PaginatedCursos } from "../domain/curso.types";
import { cursoService } from "../services/curso.service";

export function useCursos(params: CursoFilterParams = {}) {
  const [data, setData] = useState<Curso[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { q, categoria, precioMin, precioMax, page, limit, sort } = params;

  const fetchCursos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: PaginatedCursos = await cursoService.getCursos({
        q,
        categoria,
        precioMin,
        precioMax,
        page,
        limit,
        sort
      });
      setData(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar cursos");
    } finally {
      setIsLoading(false);
    }
  }, [q, categoria, precioMin, precioMax, page, limit, sort]);

  useEffect(() => {
    fetchCursos();
  }, [fetchCursos]);

  return {
    cursos: data,
    pagination,
    isLoading,
    error,
    refetch: fetchCursos
  };
}
