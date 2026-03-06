/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1400px",
      "3xl": "1600px",
    },
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
}
