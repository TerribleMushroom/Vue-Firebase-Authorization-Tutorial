/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#1a0116",
        cyan: "#5cfeff",
        cream: "#fefecc",
        orange: "#fb9032",
      },
      fontFamily: {
        sora: "Sora",
      },
    },
  },
  plugins: [],
};
