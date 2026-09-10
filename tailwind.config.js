/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F5F7",
        ink: "#0A0A0A",
        "ink-soft": "#5B5B65",
        accent: "#4F46E5",
        line: "rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        editorial: ["'Cormorant Garamond'", "serif"],
        inter: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
