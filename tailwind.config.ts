import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        card: "0 20px 50px rgba(0,0,0,0.10)"
      },
      transitionTimingFunction: {
        gentle: "cubic-bezier(0.2, 0.7, 0.2, 1)"
      }
    }
  },
  plugins: []
};

export default config;
