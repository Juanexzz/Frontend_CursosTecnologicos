import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
          light: "#eff6ff",
          dark: "#3b82f6"
        },
        secondary: {
          DEFAULT: "#7c3aed",
          hover: "#6d28d9",
          light: "#f5f3ff",
          dark: "#8b5cf6"
        },
        accent: {
          DEFAULT: "#10b981",
          hover: "#059669",
          light: "#ecfdf5"
        },
        warning: "#f59e0b",
        danger: {
          DEFAULT: "#ef4444",
          light: "#fef2f2"
        }
      }
    }
  },
  plugins: []
};

export default config;
