/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "background-image": "url('./src/assets/images/login_bg.png')",
      },
      colors: {
        "acc-edd": "rgba(172, 206, 221, 0.9)",
        "custom-orange": "#FCB217",
        "custom-blue": "#0D0745",
        "custom-blue1": "#0C0077",
      },
    },
  },
  plugins: [],
};


