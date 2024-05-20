/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Raleway: ['Raleway', 'sans-serif'],
        Agda: ['Agdasima', 'sans-serif'],
        Outfit: ['Outfit', 'sans-serif'],
      }, //end of fontFamily
    },
  },
  plugins: [require("daisyui")],
};
