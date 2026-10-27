import React from "react";
import { Curso } from "../domain/curso.types";
import { CursoCard } from "./CursoCard";
import { Skeleton } from "../../common/components/Spinner";

export interface CursoGridProps {
  cursos: Curso[];
  isLoading?: boolean;
  onOpenDetail?: (curso: Curso) => void;
  skeletonCount?: number;
}

export const CursoGrid: React.FC<CursoGridProps> = ({
  cursos,
  isLoading = false,
  onOpenDetail,
  skeletonCount = 6
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden p-4 space-y-4 shadow-sm"
          >
            <Skeleton className="w-full aspect-video rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cursos.map((curso) => (
        <CursoCard key={curso.id} curso={curso} onOpenDetail={onOpenDetail} />
      ))}
    </div>
  );
};
