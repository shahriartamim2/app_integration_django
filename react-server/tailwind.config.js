// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
// };


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#006C57",

          secondary: "#808080",

          accent: "#1dcdbc",

          neutral: "#2b3440",

          "base-100": "#ffffff",

          info: "#006C57",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",

          transparent: "#ffffff00"
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};