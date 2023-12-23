/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.{html,js}', './*.{html,js}'],
  theme: {
    extend: {},
    screens: {
      mobile: { max: '1000px' },
    },
  },
  plugins: [],
};
