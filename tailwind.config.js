/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  
  theme: {
    extend: {
      colors: {
        brandColor: {
          DEFAULT: "#00A264",
          dark: "#004D2F",
          light: "#05f59d",
          lighter: "#7efcce",
        },
        darkColor:{
          DEFAULT:"#1D232A",
          light:"#39424d",
          text:"#A6ADBB",
          input:"#121212"
        },
      },
      fontSize: {
        xxs: '0.5rem',
      },
      fontFamily: {
        brandFont: ["Lora", "sans-serif"],
        paraFont: ["Noto Sans","sans-serif"]
      },
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [require('daisyui'),require('tailwind-scrollbar-hide'),],
  daisyui: {
    themes: ["light", "dark"],
  },
  darkMode: ['selector', '[data-theme="dark"]'],
};
