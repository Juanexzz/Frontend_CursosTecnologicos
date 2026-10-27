import { Curso } from "../../cursos/domain/curso.types";

export interface Inscripcion {
  id: number;
  userId: number;
  cursoId: number;
  telefono: string;
  nivel: string;
  motivacion: string;
  createdAt: string;
  curso?: Curso;
  user?: {
    id: number;
    nombre: string;
    email: string;
  };
}

export interface CreateInscripcionRequest {
  cursoId: number;
  telefono: string;
  nivel: string;
  motivacion: string;
}

export interface PaginatedInscripciones {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Inscripcion[];
}
