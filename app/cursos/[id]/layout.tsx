import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detalle del Curso Tecnológico",
  description:
    "Conoce el temario, requisitos, duración, perfil del docente y costos de nuestros programas avanzados en NexTech Academy."
};

export default function CursoDetailLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
