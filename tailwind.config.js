/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F7FC",
        ink: "#0A1A5E",
        "ink-soft": "#57628A",
        night: "#0A1A5E",
        "night-soft": "#93A3D6",
        accent: "#0057FF",
        "accent-soft": "#E3EBFF",
        line: "rgba(10, 26, 94, 0.1)",
        "line-night": "rgba(245, 247, 252, 0.14)",
      },
      fontFamily: {
        editorial: ["'Fraunces'", "serif"],
        inter: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
