import React from "react";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "md", className = "" }) => {
  const sizeMap = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };

  return (
    <div
      role="status"
      aria-label="Cargando"
      className={`inline-block animate-spin rounded-full border-slate-200 border-t-primary ${sizeMap[size]} ${className}`}
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-slate-200 rounded ${className}`}
    />
  );
};
