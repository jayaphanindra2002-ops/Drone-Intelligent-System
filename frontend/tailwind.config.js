/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <--- ADD THIS LINE HERE
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        droneFlight: "droneFlight 25s linear infinite",
        backgroundShift: "backgroundShift 15s ease infinite",
      },
      keyframes: {
        backgroundShift: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        droneFlight: {
          "0%": { transform: "translateX(-10vw) translateY(20vh) rotate(5deg)" },
          "25%": { transform: "translateX(30vw) translateY(10vh) rotate(-5deg)" },
          "50%": { transform: "translateX(70vw) translateY(25vh) rotate(10deg)" },
          "75%": { transform: "translateX(40vw) translateY(5vh) rotate(-2deg)" },
          "100%": { transform: "translateX(110vw) translateY(20vh) rotate(5deg)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};