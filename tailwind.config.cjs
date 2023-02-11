/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    styles: true,
    themes: true,
    base: true,
    // themes: [],
  },
  plugins: [require("daisyui")],
};
