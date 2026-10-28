import React from "react";

export default function CursosLoading() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded mx-auto" />
        <div className="h-8 w-80 bg-gray-200 dark:bg-gray-800 rounded mx-auto" />
        <div className="h-4 w-96 bg-gray-100 dark:bg-gray-800 rounded mx-auto" />
      </div>

      {/* Toolbar skeleton */}
      <div className="h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-96 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 p-4 flex flex-col justify-between"
          >
            <div className="h-44 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="space-y-3 py-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
