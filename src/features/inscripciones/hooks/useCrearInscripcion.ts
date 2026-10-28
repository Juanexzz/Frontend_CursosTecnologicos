"use client";

import { useState, useCallback } from "react";
import { CreateInscripcionRequest, Inscripcion } from "../domain/inscripcion.types";
import { inscripcionService } from "../services/inscripcion.service";

export function useCrearInscripcion() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crearInscripcion = useCallback(
    async (data: CreateInscripcionRequest): Promise<Inscripcion> => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await inscripcionService.create(data);
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error al registrar la inscripción";
        setError(msg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    crearInscripcion,
    isLoading,
    error
  };
}
