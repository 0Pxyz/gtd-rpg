/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1A2526",
        emerald: "#2ECC71",
        gold: "#FFD700",
      },
      fontFamily: {
        rpg: ['"Press Start 2P"', "cursive"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};