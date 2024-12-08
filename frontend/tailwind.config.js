/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgb(0, 109, 243)',
      },
      screens: {
        'xs': '250px', 
      },
      fontFamily: {
        robotoSlab: ["Roboto Slab", "serif"],
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      transitionProperty: {
        'custom': 'background, border, border-radius, box-shadow, transform',
      },
      transitionDuration: {
        'default': '300ms',
        'long': '400ms',
      },
    },
  },
  plugins: [],
}
