/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#00A264",
          dark: "#004D2F",
          light: "#7efcce",
          extralight: "#f0fdf4",
          text: "#202124",
        },
        dark: {
          DEFAULT: "#1D232A",
          light: "#39424d",
          text: "#A6ADBB",
          input: "#121212",
        },
        "custom-border-color": {
          DEFAULT: "#9CA3AF",
        },
        placeholder: {
          DEFAULT: "#9CA3AF",
        },
      },
      backgroundImage: {
        card: "url('/backgroundCard.jpg')",
      },
      fontSize: {
        xxs: "0.7rem",
      },
      fontFamily: {
        "brand-font": ["Lora", "sans-serif"],
        "para-font": ["Noto Sans", "sans-serif"],
      },
      borderWidth: {
        0.5: "0.5px",
        3: "2px",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  darkMode: ["selector", '[data-theme="dark"]'],
};
