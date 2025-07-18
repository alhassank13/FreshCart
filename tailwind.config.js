// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        mainLight: "#F0F3F2",
        darkPrimary: "#01854C",
        tomato: "tomato",
      },
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        primary: ["Fondamento", "cursive"],
        hamozo: ["Bitcount Grid Double", "system-ui"],
      },
      keyframes: {
        loading: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        animloader2: {
          "0%": { transform: "translate(0, 0) rotateX(0) rotateY(0)" },
          "25%": { transform: "translate(100%, 0) rotateX(0) rotateY(180deg)" },
          "50%": {
            transform: "translate(100%, 100%) rotateX(-180deg) rotateY(180deg)",
          },
          "75%": {
            transform: "translate(0, 100%) rotateX(-180deg) rotateY(360deg)",
          },
          "100%": { transform: "translate(0, 0) rotateX(0) rotateY(360deg)" },
        },
      },
      animation: {
        nasser: "loading 1s linear infinite",
      },
    },
  },
  plugins: [],
};
