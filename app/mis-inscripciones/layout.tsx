import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis Inscripciones y Postulaciones",
  description:
    "Revisa el estado de tus inscripciones académicas, fechas de inicio y modalidades en NexTech Academy."
};

export default function MisInscripcionesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
