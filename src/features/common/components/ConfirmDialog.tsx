"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "./Button";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  isLoading?: boolean;
  errorMessage?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDanger = false,
  isLoading = false,
  errorMessage = null,
  onConfirm,
  onCancel
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Manejo de tecla Escape y foco al abrir
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Enfocar botón de cancelar por defecto para seguridad
    cancelButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 text-left border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${
              isDanger
                ? "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400"
                : "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
            }`}
          >
            {isDanger ? "⚠️" : "ℹ️"}
          </div>
          <h3 id="dialog-title" className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {message}
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs rounded-xl"
          >
            {errorMessage}
          </div>
        )}

        <div className="pt-2 flex justify-end gap-3">
          <Button
            ref={cancelButtonRef}
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={isDanger ? "danger" : "primary"}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
