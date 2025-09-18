import { Input } from 'postcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        textDark: "hsl(0, 100%, 100%)",
        elDark: "hsl(209, 23%, 22%)",
        bgDark: "hsl(207, 26%, 17%)",

        textLight: "hsl(200, 15%, 8%)",
        inputLight: "hsl(0, 0%, 50%)",
        elLight: "hsl(0, 100%, 100%)",
        bgLight: "hsl(0, 0%, 99%)",
      },
      fontFamily: {
        title: ["'Nunito Sans', sans-serif"],
      },
    },
  },
  plugins: [],
}
