import { http } from "../../common/http";
import {
  Curso,
  CursoFilters,
  CursosPage,
  CreateCursoRequest,
  UpdateCursoRequest
} from "../domain/curso.types";

export const cursosService = {
  listar: async (params: CursoFilters = {}): Promise<CursosPage> => {
    return http.get<CursosPage>("/cursos", {
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

  obtenerPorId: async (idOrSlug: string | number): Promise<Curso> => {
    return http.get<Curso>(`/cursos/${idOrSlug}`);
  },

  crear: async (data: CreateCursoRequest): Promise<Curso> => {
    return http.post<Curso>("/cursos", data);
  },

  actualizar: async (id: number, data: UpdateCursoRequest): Promise<Curso> => {
    return http.put<Curso>(`/cursos/${id}`, data);
  },

  eliminar: async (id: number): Promise<void> => {
    return http.delete<void>(`/cursos/${id}`);
  },

  // Subida multipart de imagen
  subirImagen: async (id: number, file: File): Promise<Curso> => {
    const formData = new FormData();
    formData.append("imagen", file);
    return http.post<Curso>(`/cursos/${id}/imagen`, formData);
  },

  // Alias para mantener compatibilidad con código existente
  getCursos: async (params: CursoFilters = {}): Promise<CursosPage> => {
    return cursosService.listar(params);
  },
  getCursoById: async (idOrSlug: string | number): Promise<Curso> => {
    return cursosService.obtenerPorId(idOrSlug);
  },
  createCurso: async (data: CreateCursoRequest): Promise<Curso> => {
    return cursosService.crear(data);
  },
  updateCurso: async (id: number, data: UpdateCursoRequest): Promise<Curso> => {
    return cursosService.actualizar(id, data);
  },
  deleteCurso: async (id: number): Promise<void> => {
    return cursosService.eliminar(id);
  }
};

export const cursoService = cursosService;
