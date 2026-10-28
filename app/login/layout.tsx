import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description:
    "Accede a tu cuenta de estudiante o docente en NexTech Academy para gestionar tus inscripciones y cursos."
};

export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
