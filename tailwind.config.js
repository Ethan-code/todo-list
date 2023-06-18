/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  daisyui: {
    themes: ['lemonade'],
  },
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
