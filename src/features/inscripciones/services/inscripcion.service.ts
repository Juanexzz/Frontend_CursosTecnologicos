import { http } from "../../common/http";
import {
  Inscripcion,
  CreateInscripcionRequest,
  PaginatedInscripciones
} from "../domain/inscripcion.types";

export const inscripcionService = {
  create: async (data: CreateInscripcionRequest): Promise<Inscripcion> => {
    return http.post<Inscripcion>("/inscripciones", data);
  },

  getMyInscripciones: async (page = 1, limit = 9): Promise<PaginatedInscripciones> => {
    return http.get<PaginatedInscripciones>("/inscripciones/mias", {
      params: { page, limit }
    });
  },

  getAllInscripciones: async (page = 1, limit = 9): Promise<PaginatedInscripciones> => {
    return http.get<PaginatedInscripciones>("/inscripciones", {
      params: { page, limit }
    });
  }
};
