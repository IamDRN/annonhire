import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./actions/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5f7fb",
        foreground: "#10213a",
        card: "#ffffff",
        border: "#dce4f0",
        muted: "#64748b",
        primary: {
          DEFAULT: "#0f4c81",
          foreground: "#f8fafc"
        },
        secondary: {
          DEFAULT: "#dbeafe",
          foreground: "#0f172a"
        },
        accent: {
          DEFAULT: "#e2f3ee",
          foreground: "#155e4b"
        },
        success: "#15803d",
        warning: "#b45309",
        danger: "#b91c1c"
      },
      boxShadow: {
        soft: "0 20px 50px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
