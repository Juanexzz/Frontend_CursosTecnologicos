import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo Completo de Cursos Tecnológicos",
  description:
    "Explora nuestro catálogo de cursos en Desarrollo Web, Cloud Computing, Inteligencia Artificial y Ciberseguridad. Filtra por categoría y encuentra tu formación ideal."
};

export default function CursosLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
