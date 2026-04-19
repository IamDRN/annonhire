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
        background: "#f6fbff",
        foreground: "#4b5563",
        card: "#ffffff",
        border: "#d8e6f0",
        muted: "#6b7280",
        primary: {
          DEFAULT: "#66b3df",
          foreground: "#f8fbff"
        },
        secondary: {
          DEFAULT: "#e7f5fc",
          foreground: "#425466"
        },
        accent: {
          DEFAULT: "#eff8fd",
          foreground: "#4b5563"
        },
        success: "#158f64",
        warning: "#c27b28",
        danger: "#b91c1c"
      },
      boxShadow: {
        soft: "0 20px 50px rgba(102, 179, 223, 0.12)"
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
