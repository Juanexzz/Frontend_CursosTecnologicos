import React from "react";

export default function GlobalLoading() {
  return (
    <div className="py-24 px-4 flex flex-col items-center justify-center space-y-4 min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
        Cargando contenidos de NexTech Academy...
      </p>
    </div>
  );
}
