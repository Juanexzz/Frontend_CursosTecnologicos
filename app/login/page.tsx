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

  if (isLoading) {
    return (
      <div className="py-16 px-4 flex items-center justify-center min-h-[calc(100vh-160px)]">
        <div className="w-full max-w-md h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="py-16 px-4 flex items-center justify-center min-h-[calc(100vh-160px)]">
      <Suspense
        fallback={
          <div className="w-full max-w-md h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
