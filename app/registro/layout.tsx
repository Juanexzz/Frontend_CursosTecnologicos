import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Cuenta",
  description:
    "Únete a NexTech Academy y accede a la mejor formación práctica en tecnología con mentores expertos de la industria."
};

export default function RegistroLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
