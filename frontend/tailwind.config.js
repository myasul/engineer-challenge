// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            'feather': '#8E8CED',
            'translucent': 'rgba(255, 255, 255, 0.2)'
        }
    },
    fontFamily: {
        'serif': ['"proxima-nova"', '"Helvetica Neue"', 'Helvetica', 'Arial', '"sans-serif"']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
