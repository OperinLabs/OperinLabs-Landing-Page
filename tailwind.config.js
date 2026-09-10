/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F1F3EF",
        ink: "#101A22",
        "ink-soft": "#5A6560",
        night: "#101A22",
        "night-soft": "#8FA096",
        accent: "#1F9D6B",
        "accent-soft": "#E4F1EA",
        amber: "#C7852E",
        line: "rgba(16, 26, 34, 0.1)",
        "line-night": "rgba(241, 243, 239, 0.14)",
      },
      fontFamily: {
        editorial: ["'Fraunces'", "serif"],
        inter: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
