import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/features/common/components/Navbar";
import { Footer } from "@/features/common/components/Footer";

export const metadata: Metadata = {
  title: "NexTech Academy | Cursos de Tecnología e Innovación",
  description:
    "NexTech Academy - Cursos tecnológicos especializados en Desarrollo Web, Cloud Computing, Inteligencia Artificial y Ciberseguridad impartidos por expertos.",
  icons: {
    icon: "/assets/img/logo.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
