/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        vsm: "360px",
        sm: "530px",
        xsm: "656px",
        md: "768px",
        xmd: "773px",
        slg: "992px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
}

