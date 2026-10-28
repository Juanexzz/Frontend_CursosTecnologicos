import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscripción y Asesoría Académica",
  description:
    "Postúlate a nuestros cursos tecnológicos de alta especialización o solicita orientación académica personalizada con nuestros asesores."
};

export default function InscripcionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
