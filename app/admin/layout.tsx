import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de Administración",
  description:
    "Gestión administrativa de cursos tecnológicos, cupos, docentes e inscripciones estudiantiles de NexTech Academy."
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
