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

export interface CursoFilterParams {
  q?: string;
  categoria?: string;
  precioMin?: number;
  precioMax?: number;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface PaginatedCursos {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Curso[];
}

export type CreateCursoRequest = Omit<Curso, "id" | "createdAt" | "updatedAt">;
export type UpdateCursoRequest = Partial<CreateCursoRequest>;
