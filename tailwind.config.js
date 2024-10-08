/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#2d0a75",
        "medium-purple": "#9370db",
        "light-purple": "#ebe8fc",
      },
    },
  },
  plugins: [],
};
