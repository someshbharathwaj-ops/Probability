import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg-2)",
        panel: "var(--panel)",
        panelStrong: "var(--panel-strong)",
        border: "var(--border)",
        accent: "var(--accent)",
        accentSoft: "var(--accent-soft)",
        gold: "var(--gold)",
        mint: "var(--mint)",
        rose: "var(--rose)",
        text: "var(--text)",
        textMuted: "var(--text-muted)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(123, 191, 255, 0.12), 0 20px 60px rgba(1, 6, 20, 0.45)",
        panel: "0 24px 70px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
