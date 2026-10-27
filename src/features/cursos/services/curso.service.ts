import { http } from "../../common/http";
import {
  Curso,
  CursoFilterParams,
  PaginatedCursos,
  CreateCursoRequest,
  UpdateCursoRequest
} from "../domain/curso.types";

export const cursoService = {
  getCursos: async (params: CursoFilterParams = {}): Promise<PaginatedCursos> => {
    return http.get<PaginatedCursos>("/cursos", {
      params: {
        q: params.q,
        categoria: params.categoria,
        precioMin: params.precioMin,
        precioMax: params.precioMax,
        page: params.page,
        limit: params.limit
      }
    });
  },

  getCursoById: async (idOrSlug: string | number): Promise<Curso> => {
    return http.get<Curso>(`/cursos/${idOrSlug}`);
  },

  createCurso: async (data: CreateCursoRequest): Promise<Curso> => {
    return http.post<Curso>("/cursos", data);
  },

  updateCurso: async (id: number, data: UpdateCursoRequest): Promise<Curso> => {
    return http.put<Curso>(`/cursos/${id}`, data);
  },

  deleteCurso: async (id: number): Promise<void> => {
    return http.delete<void>(`/cursos/${id}`);
  }
};
