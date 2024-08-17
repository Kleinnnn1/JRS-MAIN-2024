/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: { 
        "background-image": "url('./src/assets/images/login_bg.png')"
      },
      colors: {
        'acc-edd': 'rgba(172, 206, 221, 0.9)',
        'custom-orange': '#FCB217',
      },
    },
  },
  plugins: [],
}

