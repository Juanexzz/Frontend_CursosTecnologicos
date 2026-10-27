export interface Curso {
  id: number;
  titulo: string;
  slug: string;
  categoria: string;
  categoriaNombre: string;
  nivel: string;
  duracionHoras: number;
  precio: number;
  calificacion: number;
  totalResenas: number;
  estudiantes: number;
  instructorNombre: string;
  instructorEspecialidad: string;
  instructorAvatar: string;
  instructorBio: string;
  destacado: boolean;
  imagen: string;
  tecnologias: string[];
  descripcionCorta: string;
  descripcionLarga: string;
  requisitos: string[];
  temario: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CursoFilters {
  q?: string;
  categoria?: string;
  precioMin?: number;
  precioMax?: number;
  page?: number;
  limit?: number;
}

// Alias para compatibilidad con código existente
export type CursoFilterParams = CursoFilters;

export interface CursosPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CursosPage {
  pagination: CursosPagination;
  data: Curso[];
}

// Alias para compatibilidad
export type PaginatedCursos = CursosPage;

export type CreateCursoRequest = Omit<Curso, "id" | "createdAt" | "updatedAt">;
export type UpdateCursoRequest = Partial<CreateCursoRequest>;
