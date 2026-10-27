"use client";

import { useState, useEffect, useCallback } from "react";
import { Inscripcion, PaginatedInscripciones } from "../domain/inscripcion.types";
import { inscripcionService } from "../services/inscripcion.service";

export function useMyInscripciones(page = 1, limit = 9) {
  const [data, setData] = useState<Inscripcion[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInscripciones = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: PaginatedInscripciones = await inscripcionService.getMyInscripciones(page, limit);
      setData(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar tus inscripciones");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchInscripciones();
  }, [fetchInscripciones]);

  return {
    inscripciones: data,
    pagination,
    isLoading,
    error,
    refetch: fetchInscripciones
  };
}

export function useAllInscripciones(page = 1, limit = 9) {
  const [data, setData] = useState<Inscripcion[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: PaginatedInscripciones = await inscripcionService.getAllInscripciones(page, limit);
      setData(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar todas las inscripciones");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    inscripciones: data,
    pagination,
    isLoading,
    error,
    refetch: fetchAll
  };
}
