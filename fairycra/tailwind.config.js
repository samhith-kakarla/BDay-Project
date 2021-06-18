const colors = require("tailwindcss/colors"); 

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      lightBlue: colors.blue,
      white: colors.white, 
      gray: '#212121', 
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
