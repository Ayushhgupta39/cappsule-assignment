/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      colors: {
        cappsule_text_dark_blue: "#2A527A",
        cappsule_icon_gray: "#555555",
        cappsule_text_black: "#112D31",
        cappsule_text_gray: "#888888",
        cappsule_font_2: "#222222",
        cappsule_light_green: "#A7D6D4",
      }
    },
  },
  plugins: [],
}