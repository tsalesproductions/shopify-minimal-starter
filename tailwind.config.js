/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/*.liquid',
    './templates/**/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './src/js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
