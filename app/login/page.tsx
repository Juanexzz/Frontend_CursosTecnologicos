"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return null;

  return (
    <div className="py-16 px-4 flex items-center justify-center min-h-[calc(100vh-160px)]">
      <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Cargando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
