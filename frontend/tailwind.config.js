// tailwind.config.js
module.exports = {
//   mode: 'jit',
//   purge: [
//     './public/**/*.html',
//     './src/**/*.{js,jsx,ts,tsx,vue}',
//   ],
  purge: [],
  theme: {
    extend: {
        colors: {
            'feather-primary': '#8E8CED',
            'feather-border': '#8E8CEE',
            'feather-hover': 'rgb(164, 162, 241, 0.5)',
            'feather-dark':'#6160A2',
            'translucent': 'rgba(255, 255, 255, 0.2)'
        },
        keyframes: {
            'fade-in' : {
                '0%': {opacity: '0'},
                '100%': {opacity: '1'},
            }
        },
        animation: {
            'fade-in': 'fade-in 0.5s ease-in'
        }
    },
    fontFamily: {
        'serif': ['"proxima-nova"', '"Helvetica Neue"', 'Helvetica', 'Arial', '"sans-serif"']
    }
  },
  variants: {
    extend: {
        button: ['disabled'],
        opacity: ['disabled'],
    },
  },
  plugins: [],
};
