/* eslint-disable linebreak-style */
/* eslint-disable indent */

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index-html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "huerta": "url('@/images/huertas.jpg')",
      }
    },
  },
  plugins: [],
};

