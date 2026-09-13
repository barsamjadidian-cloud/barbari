import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          50: "#fdf8f3",
          100: "#f5e6d3",
          200: "#e8d5c4",
          300: "#d9b99c",
          400: "#c19a6b",
          500: "#a67c52",
          600: "#8b5e3c",
          700: "#6b4423",
          800: "#3c2a21",
          900: "#2b1b17",
          950: "#1a1207"
        },
        cream: {
          50: "#fffbf2",
          100: "#fff8e7",
          200: "#ffefc6",
          300: "#ffe9b3",
          400: "#ffe0a0",
        },
        caramel: {
          50: "#fdf6ee",
          100: "#F5E6D3",
          200: "#E8D5C4",
          300: "#C19A6B",
          400: "#A67C52",
        },
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#D4A017",
          500: "#E8B923",
          600: "#ca8a04",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e3ebe3",
          500: "#8A9A8B"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      },
      boxShadow: {
        "soft": "0 2px 20px rgba(43,27,23,0.06)",
        "medium": "0 8px 30px rgba(43,27,23,0.10)",
        "large": "0 20px 60px rgba(43,27,23,0.15)",
        "gold": "0 8px 24px rgba(212,160,23,0.25)",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "float": { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        "shimmer": { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } }
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.7s ease-out",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      }
    }
  },
  plugins: []
};
export default config;
