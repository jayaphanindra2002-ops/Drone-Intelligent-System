export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  animation: {
    droneFlight: "droneFlight 18s linear infinite",
  },
  keyframes: {
    droneFlight: {
      "0%": { transform: "translateX(-10vw) translateY(20vh)" },
      "25%": { transform: "translateX(30vw) translateY(10vh)" },
      "50%": { transform: "translateX(70vw) translateY(25vh)" },
      "75%": { transform: "translateX(40vw) translateY(5vh)" },
      "100%": { transform: "translateX(110vw) translateY(20vh)" },
    },
  },
},
  },
  plugins: [require("@tailwindcss/typography")],
};

